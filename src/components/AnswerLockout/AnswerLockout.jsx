import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Assuming firebaseConfig.js has the Firestore configuration
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { Box, Button, Text, VStack, Spinner } from "@chakra-ui/react";

export const AnswerLockout = ({ userId }) => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockout, setLockout] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFailedAttempts(userData.failedAttempts || 0);
        setLockout(userData.lockout || false);

        if (userData.lockout && userData.lockoutTime) {
          const lockoutTime = userData.lockoutTime.toDate(); // Firestore timestamp to Date object
          const currentTime = new Date();
          const timeDifference = (currentTime - lockoutTime) / 1000; // Time in seconds

          // Check if the lockout period (30 minutes = 1800 seconds) has passed
          if (timeDifference < 1800) {
            setLockoutTimeLeft(1800 - timeDifference); // Set remaining lockout time
          } else {
            // Reset lockout and failed attempts after 30 minutes
            await updateDoc(userRef, {
              failedAttempts: 0,
              lockout: false,
              lockoutTime: null,
            });
            setFailedAttempts(0);
            setLockout(false);
          }
        }
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userRef, {
          failedAttempts: 0,
          lockout: false,
          lockoutTime: null,
        });
      }

      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  // Function to handle a new answer attempt
  const handleNewAttempt = async (isCorrect) => {
    const userRef = doc(db, "users", userId);

    if (!isCorrect) {
      // Increment failed attempts on incorrect answer
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= 5) {
        setLockout(true);
        setLockoutTimeLeft(1800); // Lockout for 30 minutes

        // Update Firestore with lockout status and time
        await updateDoc(userRef, {
          failedAttempts: newFailedAttempts,
          lockout: true,
          lockoutTime: Timestamp.now(),
        });
      } else {
        // Update Firestore with new failed attempts count
        await updateDoc(userRef, { failedAttempts: newFailedAttempts });
      }
    } else {
      // Reset failed attempts on correct answer
      setFailedAttempts(0);
      await updateDoc(userRef, { failedAttempts: 0 });
    }
  };

  // Countdown timer for lockout
  useEffect(() => {
    if (lockout && lockoutTimeLeft > 0) {
      const intervalId = setInterval(() => {
        setLockoutTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lockout, lockoutTimeLeft]);

  return (
    <VStack spacing={4} align="center">
      {loading ? (
        <Spinner />
      ) : lockout ? (
        <Box p={4} bg="red.100" borderRadius="md" textAlign="center">
          <Text fontSize="lg" color="red.500">
            You have been locked out due to multiple failed attempts. Please
            take a break.
          </Text>
          <Text fontSize="md">
            Time remaining: {Math.floor(lockoutTimeLeft / 60)} minutes and{" "}
            {lockoutTimeLeft % 60} seconds
          </Text>
        </Box>
      ) : (
        <Box p={4} bg="green.100" borderRadius="md" textAlign="center">
          <Text fontSize="lg">You can attempt to answer questions.</Text>
          <Button colorScheme="blue" onClick={() => handleNewAttempt(false)}>
            Simulate Incorrect Answer
          </Button>
          <Button colorScheme="green" onClick={() => handleNewAttempt(true)}>
            Simulate Correct Answer
          </Button>
        </Box>
      )}
    </VStack>
  );
};
