import { GridColDef } from '@mui/x-data-grid';

type TFn = (value: any) => any;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
export const rowSanitizer = (value: TTowSanitizer): string | any => {
  return value === null || value === undefined ? ' ' : value;
};

/**
 * Repartir el espacio en partes iguales
 * @param columns
 */
export const columnsFlexResolver = (columns: GridColDef[]) => {
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });
};

// Typado para obtener NumberRange
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length
  ? Arr
  : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];

type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [
  ...arr1: BuildArray<Num2>,
  ...arr2: infer Rest,
]
  ? Rest['length']
  : never;

type NumberRange<
  start extends number,
  end extends number,
  R extends unknown[] = [start],
> = R['length'] extends Subtract<end, start>
  ? [...R, end][number]
  : NumberRange<start, end, [...R, Add<start, R['length']>]>;

/**
 * Select the pageSize dynamically using the component UI.
 * @default [10, 25, 50]
 */
export type PageSizeOptions = Array<NumberRange<5, 50> | { value: NumberRange<5, 50>; label: string }>;

// TODO MUI permite un pageSize 100 como máximo, pero el back topea en 50. Se debe validar que los valores de pegeSizeOptions sean <= 50
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
