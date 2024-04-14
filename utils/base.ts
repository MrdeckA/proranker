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

export function isLink(str: string): boolean {
  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return linkRegex.test(str);
}

export function isEmail(str: string): boolean {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(str);
}
