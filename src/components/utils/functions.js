import { WEEKDAYS } from "./const";

export const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5);
  });
}

export const today = () => {
  const today = new Date();
  const dayOfWeek = WEEKDAYS[today.getDay()];
  return dayOfWeek
}