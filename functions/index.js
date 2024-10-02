const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { pipeline } = require("stream");
const { promisify } = require("util");
const pipelineAsync = promisify(pipeline);
const rateLimit = require("express-rate-limit"); // Import the rate-limit package

dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all requests or a specific route
app.use(limiter); // You can also use app.use("/prompt", limiter); to limit only the "/prompt" route

app.post("/prompt", async (req, res) => {
  try {
    const { model, messages, ...restOfApiParams } = req.body;

    // Construct the payload for OpenAI API
    const constructor = {
      model: "gpt-4o-mini",
      messages: messages || [],
      stream: true, // Enable streaming
      ...restOfApiParams,
    };

    // Make the OpenAI API call using node-fetch
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(constructor),
      }
    );

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
    }

    // Set headers to keep the connection alive for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let buffer = ""; // Accumulate incomplete chunks here

    await pipelineAsync(
      openaiResponse.body, // Node.js readable stream from fetch
      async (source) => {
        for await (const chunk of source) {
          buffer += chunk.toString(); // Accumulate the chunk in the buffer

          // Try to parse the buffer whenever a new chunk is received
          try {
            // Check if we have a valid JSON object in the buffer
            if (buffer.startsWith("data:")) {
              buffer = buffer.replace("data:", "").trim(); // Clean up the 'data:' prefix
            }

            const parsed = JSON.parse(buffer); // Attempt to parse the buffer
            const content = parsed.choices?.[0]?.delta?.content ?? "";

            if (content) {
              // Send each chunk of content to the client
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }

            // Reset buffer after successful parse
            buffer = "";
          } catch (err) {
            // If parsing fails, it's likely incomplete data—wait for more chunks
            // If it's a valid chunk, we log the error and send the incomplete data
            if (err.message.includes("Unexpected end of JSON input")) {
              // Wait for more data, do nothing (continue accumulating)
            } else {
              // Log and handle errors in the message
              console.error("Could not parse message:", buffer, err);
              res.write(`data: ${buffer}\n\n`); // Send the raw message as a response
              buffer = ""; // Reset buffer
            }
          }
        }
      }
    );

    // Close the response when done
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error generating completion:", error);
    res.status(500).send({ error: error.message });
  }
});

exports.app = functions.https.onRequest(app);
