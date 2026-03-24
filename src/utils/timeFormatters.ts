export function getFormattedTime(now = new Date()) {
  // example format: 12:45
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
