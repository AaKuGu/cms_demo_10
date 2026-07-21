// src/lib/tryCatchAction.js
export async function tryCatchAction(fn) {
  try {
    return await fn();
  } catch (err) {
    console.error("Action failed:", err);

    // Mongo duplicate key error (unique index violation)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0];
      return { error: field ? `This ${field} is already in use.` : "This record already exists." };
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors || {})[0];
      return { error: firstError?.message || "Invalid data provided." };
    }

    // Mongoose bad ObjectId / cast error
    if (err.name === "CastError") {
      return { error: "Invalid ID provided." };
    }
      
    return { error: "Something went wrong. Please try again." };
  }
}