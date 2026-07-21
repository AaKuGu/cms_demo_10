export function throwError(message) {
  if(process.env.NODE_ENV === "development")
  console.log("throw error message : ", message);
  throw new Error(message);
}