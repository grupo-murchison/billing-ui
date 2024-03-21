type Currency = 'USD' | 'ARS'; // https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
type CurrencyDisplay = 'code' | 'narrowSymbol' | 'symbol';
type Style = 'currency' | 'decimal' | 'percent' | 'unit';

// const options: Intl.NumberFormatOptions = {}

export const currencyFormatter = (param?: { symbol?: boolean; currency?: Currency }) =>
  new Intl.NumberFormat('es-AR', {
    style: param?.symbol ? 'currency' : undefined,
    currency: param?.currency || 'USD',
    currencyDisplay: 'narrowSymbol',
  });
