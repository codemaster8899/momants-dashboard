export const toDisplayLabel = (value: string) =>
  (value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
