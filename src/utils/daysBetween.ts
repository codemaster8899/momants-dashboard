export function daysBetween(
  startDate: string | Date,
  endDate: string | Date,
): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  // Clear the time part to avoid partial day issues
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - start.getTime(); // milliseconds difference
  const diffDays = diffTime / (1000 * 60 * 60 * 24); // convert ms to days
  return diffDays;
}

export function subtractDays(date: string | Date, days: number): Date {
  const baseDate = typeof date === "string" ? new Date(date) : new Date(date); // clone to avoid mutation
  baseDate.setDate(baseDate.getDate() - days); // subtract days
  return baseDate;
}

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
