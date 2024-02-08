import { DateTime } from "luxon";

export const logolify = (value: string) => {
  return value
    ? value
        .toUpperCase()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "";
};

export const prettyDate = (value: string) => {
  if (isEmptyString(value)) return value;
  return DateTime.fromISO(value).toLocaleString();
};
