export default {
  header: 'Dodaj nowy produkt',
  buttonBack: 'Wstecz',
  buttonNext: 'Dalej',
  buttonSubmit: 'Zapisz produkt',
  addProduct: 'Dodaj produkt',

  responseSuccess: 'Produkt został dodany',
  responseFailure: 'Nie udało się dodać produktu',

  steps: {
    info: {
      title: 'Informacje',
      description: 'Dane podstawowe',
    },
    price: {
      title: 'Cena',
      description: 'Dane cenowe',
    },
    availability: {
      title: 'Dostępność',
      description: 'Stany magazynowe',
    },
  }
} as const;
