export const isEmptyString = (value?: unknown) => value === "";

export const isEmptyArray = (value?: unknown) => {
  return Array.isArray(value) && value.length === 0;
};

export const isEmptyNumber = (value?: unknown) => value === 0;

export const isEmptyObject = (object?: unknown) => {
  return (
    object &&
    Object.keys(object).length === 0 &&
    Object.getPrototypeOf(object) === Object.prototype
  );
};

export function isLink(str: string): string {
  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return "fff";
}
