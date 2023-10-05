import { GridColDef } from '@mui/x-data-grid';

type TFn = (value: AnyValue) => AnyValue;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
export const rowSanitizer = (value: TTowSanitizer): string | AnyValue => {
  return value === null || value === undefined ? ' ' : value;
};

/**
 * Repartir el espacio en partes iguales
 * @param columns
 */
export const columnsFlexResolver = (columns: GridColDef[]) => {
  columns.forEach((col: AnyValue) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });
};

/**
 * Select the pageSize dynamically using the component UI.
 * @default [10, 25, 50]
 */
export type PageSizeOptions = Array<NumberRange<5, 50> | { value: NumberRange<5, 50>; label: string }>;

export const pageSizeOptionsResolver = (
  pageSizeOptions?: PageSizeOptions,
): { pageSizeOptions: PageSizeOptions; pageSize: number } => {
  let _pageSizeOptions: PageSizeOptions = [10, 25, 50];

  if (pageSizeOptions) {
    // pageSizeOptions.reduceRight((a, b) => )
    _pageSizeOptions = pageSizeOptions ? pageSizeOptions : _pageSizeOptions;
  }

  const pageSize = _pageSizeOptions?.slice(-1)[0] ? _pageSizeOptions?.slice(-1)[0] : 50;

  return { pageSizeOptions: _pageSizeOptions, pageSize };
};

/**
 * Devuelve boolean para TabLayout. Revisa si hay un form error dentro de los formsFields
 * @param formFields
 * @param formErrors
 */
export const handleIsError = (formFields: AnyValue, formErrors: AnyValue) => {
  const keysOfErrors = Object.keys(formErrors);
  const auxilarArray = [];

  for (const fieldOfForm of formFields) {
    const hasError = keysOfErrors.includes(fieldOfForm);
    auxilarArray.push(hasError);
  }
  const result = auxilarArray.filter(el => el == true);
  return result.length > 0 ? true : false;
};
