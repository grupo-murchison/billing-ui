type TFn = (value: any) => any;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
export const rowSanitizer = (value: TTowSanitizer): string | any => {
  return value === null || value === undefined ? ' ' : value;
};
