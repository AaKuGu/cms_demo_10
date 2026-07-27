export const errorConsole = (msg) => {
  console.error(msg);
};

export const logConsole = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};