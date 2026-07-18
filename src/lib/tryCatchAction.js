export async function tryCatchAction(fn, fallbackValues) {
  try {
    return await fn();
  } catch (err) {
    console.error("Action failed:", err);
    return {
      error: "Something went wrong. Please try again.",
      values: fallbackValues,
    };
  }
}