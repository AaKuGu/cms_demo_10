export const errorConsole = (...args) => {
  if(process.env.NODE_ENV !== "production"){ console.error(...args); }
};

export const logConsole = (...args) => {
  if(process.env.NODE_ENV !== "production"){ console.log(...args);}
};