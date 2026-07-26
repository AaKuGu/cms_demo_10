import { errorConsole } from "./console/console";

export function throwError(message) {
   if (process.env.NODE_ENV === "development") {
   errorConsole(message);
  }
  const err = new Error(message);
  err.isAppError = true; // flag lagao, distinguish karne ke liye
  throw err
}