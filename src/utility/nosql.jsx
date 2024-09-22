// Import Firestore functions
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../database/firebaseResources";

// Update user data with timer, streak, startTime, and endTime
export const updateUserData = async (
  userId,
  timer,
  streak,
  startTime,
  endTime
) => {
  const userDocRef = doc(database, "users", userId);
  await updateDoc(userDocRef, {
    timer,
    streak,
    startTime: startTime.toISOString(), // Store dates as ISO strings
    endTime: endTime.toISOString(),
  });
};

// Retrieve user data to use within the component
export const getUserData = async (userId) => {
  const userDocRef = doc(database, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      ...data,
      startTime: new Date(data.startTime), // Convert ISO strings back to Date objects
      endTime: new Date(data.endTime),
    };
  } else {
    return null; // Handle case where user document does not exist
  }
};

// Function to create or update a user in Firestore
export const createUser = async (npub, userName, language) => {
  const userDoc = doc(database, "users", npub);
  await setDoc(
    userDoc,
    {
      name: userName,
      npub: npub,
      step: 0, // Initialize step count to 0
      previousStep: 0,
      language: language,
    },
    { merge: true }
  ); // Merge true ensures it doesn't overwrite existing data
};

// Function to increment the step count for a user
export const incrementUserStep = async (npub) => {
  const userDoc = doc(database, "users", npub);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const currentStep = userSnapshot.data().step || 1;
    await updateDoc(userDoc, {
      previousStep: currentStep + 1,
      step: currentStep + 1,
    });
  }
};

export const incrementToSubscription = async (npub, previousStep) => {
  const userDoc = doc(database, "users", npub);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    await updateDoc(userDoc, {
      previousStep: previousStep,
      step: "subscription",
    });
  }
};

export const incrementToFinalAward = async (npub) => {
  const userDoc = doc(database, "users", npub);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    await updateDoc(userDoc, {
      step: "award",
      previousStep: "award",
    });
  }
};

export const getUserStep = async (npub) => {
  const userDoc = doc(database, "users", npub);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data().step || 1;
  } else {
    return 0; // Default to step 0 if user document does not exist
  }
};
