const priceFormatter = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export const formatPrice = (value: number) =>
  `${priceFormatter.format(value)} PLN`;
