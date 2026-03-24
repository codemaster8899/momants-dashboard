export function sliceString(
  input: string,
  amount: number,
  addDots = false,
): string {
  if (amount <= 0) return ""; // return empty string for non-positive amount

  if (input.length <= amount) {
    return input; // no need to slice
  }

  return addDots ? input.slice(0, amount) + "..." : input.slice(0, amount);
}
