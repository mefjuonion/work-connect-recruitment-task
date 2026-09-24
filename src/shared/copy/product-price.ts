export default {
  fields: {
    netPrice: { label: 'Cena netto', placeholder: '' },
    grossPrice: { label: 'Cena brutto', placeholder: '' },
    vatRate: { label: 'VAT', placeholder: '' },
    currency: { label: 'Waluta', placeholder: '' },
  },
  validation: {
    priceRequired: 'Podaj cenę',
    pricePositive: 'Cena musi być większa od 0',
    priceDecimals: 'Cena może mieć maksymalnie 2 miejsca po przecinku',
    vatRateInvalid: 'Wybierz stawkę VAT z listy',
    currencyInvalid: 'Wybierz walutę z listy',
    grossPriceMismatch: 'Cena brutto nie zgadza się z ceną netto i stawką VAT',
  },
} as const;
