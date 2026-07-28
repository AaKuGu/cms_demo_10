export function getNameInitials(name, fallback = "?") {
  if (!name) return fallback;

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}
