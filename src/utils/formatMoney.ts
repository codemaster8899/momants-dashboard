const formatMoney = (amount: number, currency: string) => {
  const value = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(amount);
  return value;
};

export default formatMoney;
