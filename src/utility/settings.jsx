import { translation } from "./translation";

export const convertMinutesToReadableFormat = (totalMinutes) => {
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
};

export const formatIntervalText = (days, hours, minutes, userLanguage) => {
  let text = "";
  if (days)
    text += `${days} ${translation[userLanguage]["modal.selfPace.day"]}${
      days > 1 ? "s" : ""
    }, `;
  if (hours)
    text += `${hours} ${translation[userLanguage]["modal.selfPace.hour"]}${
      hours > 1 ? "s" : ""
    }, `;
  text += `${minutes} ${translation[userLanguage]["modal.selfPace.minute"]}${
    minutes > 1 ? "s" : ""
  }`;
  return text;
};
