export const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD', // https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
  currencyDisplay: 'symbol'
});
