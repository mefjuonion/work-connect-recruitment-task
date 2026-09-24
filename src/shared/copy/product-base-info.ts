export default {
  fields: {
    name: { label: 'Nazwa produktu', placeholder: 'np. MacBook Pro 14' },
    sku: { label: 'SKU produktu', placeholder: 'np. MBP14M3PRO' },
    description: { label: 'Opis', placeholder: 'Krótki opis produktu' },
    manufacturer: { label: 'Producent', placeholder: 'Wybierz producenta' },
    category: { label: 'Kategoria', placeholder: 'Wybierz kategorię' },
    features: { label: 'Cechy produktu', placeholder: '' },
  },
  options: {
    manufacturer: {
      apple: 'Apple',
      samsung: 'Samsung',
      sony: 'Sony',
      bosch: 'Bosch',
      xiaomi: 'Xiaomi',
    },
    category: {
      computers: 'Komputery',
      phones: 'Telefony',
      tv: 'RTV',
      appliances: 'AGD',
      accessories: 'Akcesoria',
    },
    features: {
      new: 'Nowość',
      bestseller: 'Bestseller',
      eco: 'Ekologiczny',
      waterproof: 'Wodoodporny',
      wireless: 'Bezprzewodowy',
    },
  },
  validation: {
    nameRequired: 'Podaj nazwę produktu',
    nameMin: 'Nazwa musi mieć co najmniej 3 znaki',
    skuRequired: 'Podaj SKU produktu',
    skuMax: 'SKU może mieć maksymalnie 24 znaki',
    skuFormat: 'SKU może zawierać tylko litery i cyfry',
    manufacturerInvalid: 'Wybierz producenta z listy',
    categoryInvalid: 'Wybierz kategorię z listy',
    featureInvalid: 'Wybierz cechę z listy',
    featuresMin: 'Wybierz co najmniej jedną cechę',
  },
} as const;
