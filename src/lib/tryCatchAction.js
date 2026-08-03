// import { errorConsole } from "./console/console";

// // lib/tryCatchAction.js
// export async function tryCatchAction(fn) {
//   try {
//     const data = await fn();
//     return { data, error: null };
//   } catch (err) {
//     // redirect() internally throw karta hai, usko catch mat karo
//     if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;

//     errorConsole(`Action failed: ${err.message}`);

//       if (err.isAppError) {
//       return { data: null, error: err.message }; // humara khud ka throw — safe hai dikhane ke liye
//     }
//     return { data: null, error: "Something went wrong. Please try again." }; // unexpected — generic

//   }
// }

import { errorConsole } from "./console/console";

// lib/tryCatchAction.js
export async function tryCatchAction(fn) {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    // redirect() internally throw karta hai, usko catch mat karo
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;

    errorConsole(`Action failed: ${err.message}`);

    if (err.isAppError) {
      return { data: null, error: err.message }; // humara khud ka throw — safe hai dikhane ke liye
    }

    // MongoDB duplicate key error (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || "value";
      const value = err.keyValue?.[field];
      return {
        data: null,
        error: `This ${field}${value ? ` (${value})` : ""} is already in use.`,
      };
    }

    return { data: null, error: "Something went wrong. Please try again." }; // unexpected — generic
  }
}