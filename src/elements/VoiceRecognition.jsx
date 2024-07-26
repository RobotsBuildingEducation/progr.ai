import React, { useState, useEffect } from "react";

const VoiceRecognition = ({ onResult }) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onstart = () => setIsListening(true);
      speechRecognition.onend = () => setIsListening(false);
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      setRecognition(speechRecognition);
    } else {
      alert("Your browser does not support speech recognition.");
    }
  }, [onResult]);

  const handleStartListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <button onClick={handleStartListening} disabled={isListening}>
      {isListening ? "Listening..." : "Start Voice Input"}
    </button>
  );
};

export default VoiceRecognition;
