export const errorConsole = (...args) => {
  console.error(...args);
};

export const logConsole = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};