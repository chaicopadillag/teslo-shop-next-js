export const format = (value: number) => {
  const currencyFormat = Intl.NumberFormat('pe-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currencyFormat.format(value);
};
