export const APP_VERSION = 'beta1.0.1';

export const zodLocale = {
  required_error: 'El campo es requerido.',
  numberPositive: 'Debe ser mayor a 0',
  stringMax: (cant?: number) => `Ha superado el límite de ${cant || ''} caracteres`,
};
