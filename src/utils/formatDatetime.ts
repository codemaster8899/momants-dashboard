import { daysBetween, sameDay } from "./daysBetween";

// TODO: WHOLE FILE SHOULD BE REFACTORED, old code from dashboard, but no time to refactor
export const formatDateTime = (
  value: string | Date,
  includeTime: boolean = true,
  includeYear: boolean = false,
): string => {
  if (!value) return "-";

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else {
    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);

    date = isDateOnly
      ? (() => {
          const [y, m, d] = value.split("-").map(Number);
          return new Date(y, m - 1, d);
        })()
      : new Date(value);

    if (Number.isNaN(date.getTime())) return "-";
  }

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const formatDate = (d: Date): string =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      ...(includeYear ? { year: "numeric" } : {}),
    });

  const formatTimeLocal = (d: Date): string =>
    d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const diffDays =
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24);

  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;

  if (diffDays === 0) {
    if (!includeTime || !hasTime) return "today";
    return `today ${formatTimeLocal(date)}`;
  }

  if (diffDays === 1) {
    if (!includeTime || !hasTime) return "yesterday";
    return `yesterday ${formatTimeLocal(date)}`;
  }

  const datePart = formatDate(date);

  if (!includeTime || !hasTime) {
    return datePart;
  }

  return `${datePart} ${formatTimeLocal(date)}`;
};

export const formatDatePicker = (
  from: Date | null,
  to: Date | null,
): string => {
  if (!from && !to) {
    return "-";
  }

  if (!from) {
    return formatDateTime(to!, false, false!);
  }

  if (!to) {
    return formatDateTime(from, false, false);
  }

  if (sameDay(to, from)) {
    return formatDateTime(to, false, false);
  }

  // added type assertion because typescript can not interpret
  // all the if statements before this comment

  const today = new Date();
  if (sameDay(to!, today)) {
    // round the number because can be a float if times do not match
    return `Last ${Math.round(daysBetween(from, to)) + 1} days`;
  }

  return `${formatDateTime(from, false, false)} - ${formatDateTime(to, false, false)}`;
};

export function formatDateTimeMilitary(date: Date): string {
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const year = date.getFullYear();

  return `${time} ${monthDay} ${year}`;
}