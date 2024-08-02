// Import Firestore functions
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../database/firebaseResources";

// Function to create or update a user in Firestore
export const createUser = async (npub, userName) => {
  const userDoc = doc(database, "users", npub);
  await setDoc(
    userDoc,
    {
      name: userName,
      npub: npub,
      step: 0, // Initialize step count to 0
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
      step: currentStep + 1,
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
