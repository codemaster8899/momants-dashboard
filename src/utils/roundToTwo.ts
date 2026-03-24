export const roundToTwo = (value: number | undefined): number | null => {
    if (value === undefined) return null;
    return Math.round(value * 100) / 100;
};
