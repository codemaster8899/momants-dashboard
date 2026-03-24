export type TimeUnit = "hour" | "day" | "month" | "week" | "year";
export const emptyDataPointsValue = [{ date: "-", count: 0 }];
export const emptyCircleChartData = [{ label: "No data", value: 1 }];

export const authCookieNames = ["access", "refresh", "rememberMe"];

export interface timeUnitOption {
  label: TimeUnit;
  maxDifference: number;
}

export const defaultDaysBetween = 29; // 29 days between is last 30 days because it is between

export const timeUnitOptions: timeUnitOption[] = [
  // max difference is in days
  { label: "hour", maxDifference: 7 },
  { label: "day", maxDifference: 365 },
  { label: "week", maxDifference: 52 * 7 * 2 }, //  max 104 week aka 2 years
  { label: "month", maxDifference: 120 * 31 }, // 120 months max
  { label: "year", maxDifference: 365 * 100 }, // max 100 years
];

export const defaultTimeUnit = timeUnitOptions[1].label;

// NOTE: when adding a new page add it to the proxy restricted guard if nessarary
