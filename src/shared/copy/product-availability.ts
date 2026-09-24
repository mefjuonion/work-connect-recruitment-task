export default {
  fields: {
    isAvailable: { label: 'Produkt jest dostępny' },
    isLimited: { label: 'Produkt limitowany' },
    stock: { label: 'Liczba produktów na magazynie', placeholder: '' },
    cartLimits: { label: 'Limity koszyka' },
    minPerCart: { label: 'Minimalna ilość', placeholder: '' },
    maxPerCart: { label: 'Maksymalna ilość', placeholder: '' },
  },
  validation: {
    cartQuantityInteger: 'Ilość musi być liczbą całkowitą',
    cartQuantityMin: 'Ilość musi wynosić co najmniej 1',
    stockInteger: 'Liczba produktów musi być liczbą całkowitą',
    stockNonNegative: 'Liczba produktów nie może być ujemna',
    stockRequired: 'Podaj liczbę produktów na magazynie',
    maxPerCartBelowMin: 'Maksymalna ilość nie może być mniejsza niż minimalna',
  },
} as const;
