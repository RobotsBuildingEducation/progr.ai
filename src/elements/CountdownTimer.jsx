import React, { useEffect, useState } from "react";
import { translation } from "../utility/translation";

export const CountdownTimer = ({ onTimerExpire, userLanguage }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Retrieve expiry time from localStorage and parse it as a number
    const expiryTime = parseInt(localStorage.getItem("incorrectExpiry"), 10);

    if (!expiryTime) return; // Exit if no expiry time is found

    // Function to calculate remaining time and update state
    const updateTimeLeft = () => {
      const currentTime = new Date().getTime();
      const remainingTime = expiryTime - currentTime;

      // Update the remaining time in state or set to 0 if expired
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);

      if (remainingTime <= 0 && onTimerExpire) {
        onTimerExpire();
      }
    };

    // Set an interval to update the time left every second
    const intervalId = setInterval(updateTimeLeft, 1000);

    // Initial call to set the correct time immediately
    updateTimeLeft();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [onTimerExpire]); // Empty dependency array since `expiryTime` doesn't change

  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div style={{ maxWidth: 600 }}>
      {timeLeft > 0 ? (
        <h1>
          {translation[userLanguage]["lockout.timer"]} {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default CountdownTimer;
