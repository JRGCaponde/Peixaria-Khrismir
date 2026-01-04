
export const CURRENCY = 'AOA';
export const APP_NAME = 'Khrismir';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
  }).format(value);
};

export const DELIVERY_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '13:00 - 15:00',
  '15:00 - 17:00'
];

// Iniciando com lista vazia conforme solicitado
export const MOCK_PRODUCTS = [];
