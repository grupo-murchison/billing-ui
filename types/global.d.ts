declare type Nullable<T> = T | null;
declare type Undefined<T> = T | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyValue = any;

// to NumberRange
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

/**
 * Crea un rango numerico, permite ingreso de números dentro del rango generado
 * Example: NumberRange<1, 20>
 */
declare type NumberRange<
  start extends number,
  end extends number,
  R extends unknown[] = [start],
> = R['length'] extends Subtract<end, start>
  ? [...R, end][number]
  : NumberRange<start, end, [...R, Add<start, R['length']>]>;

/**
 * Recibe un literal type de strings para intellisense y permite el ingreso de strings fuera del tipado.
 * @template T
 * @param {T} - "valor1" | "valor2" | "valor..."
 * Example: TemplateLiteralString<"valor1" | "valor2" | "valor...">
 */
type TemplateLiteralString<T> = T | Omit<string, T>;
