export const format = (value: number) => {
  const currencyFormat = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currencyFormat.format(value);
};
