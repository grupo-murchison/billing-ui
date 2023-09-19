import { format, parse, parseISO } from 'date-fns';

type FormatDateString = 'yyyyMMdd' | 'yyyyMMddHHmmss' | 'yyyyMMddHHmmssSSS' | 'dd-MM-yyyy';

const defaultOutputFormat = 'dd/MM/yyyy';

/**
 * Recibe un JS Date o Date Object y devuelve un string con formato back-end 'yyyyMMdd'
 * @param {inputDate} inputDate
 * Example: Mon Sep 18 2023 00:00:00 GMT-0300
 */
export const parseToDBString = (inputDate: Nullable<Date>) => {
  if (!inputDate) return undefined;

  return format(inputDate, 'yyyyMMdd');
};

/**
 * Recibe un formato backend 'yyyyMMdd' y devuelve JS Date o Date Object
 * @param {inputDateStr} inputDateStr
 * Example: '20230301'
 */
export const parseFromDBString = (inputDateStr: string) => {
  return parse(inputDateStr, 'yyyyMMdd', new Date());
};

/**
 * Recibe un formato backend 'yyyyMMdd' y devuelve un string con formato front-end estándar dd-MM-yyyy
 * @param {inputDateStr} inputDateStr
 * Example: '20230301'
 */
export const beautifyDBString = (inputDateStr?: Nullable<string>) => {
  if (!inputDateStr) return undefined;

  const parsedDate = parseFromDBString(inputDateStr);
  return format(parsedDate, defaultOutputFormat);
};

/**
 * Recibe un ISO Date y devuelve un string con formato front-end estándar dd-MM-yyyy
 * @param {inputDate} inputDate
 * Example: 2023-01-01T03:00:00.000Z
 */
export const beautifyISO = (inputDate: Nullable<string>) => {
  if (!inputDate) return undefined;

  return format(parseISO(inputDate), defaultOutputFormat);
};

export const ISOStringToTimeStamp = (inputDate: Nullable<string>) => {
  if (!inputDate) return undefined;

  return format(parseISO(inputDate), 'yyyyMMdd-HHmmssSSS');
};

/**
 * Recibe una fecha en string, formato de entrada  y el formato de salida deseado
 * @param {inputDate} inputDate
 */
export const fromFormatToFormat = (
  inputDate: Nullable<string>,
  inputFormat: TemplateLiteralString<FormatDateString>,
  outputFormat: TemplateLiteralString<FormatDateString>,
) => {
  if (!inputDate) return undefined;

  return format(
    parse(inputDate, (inputFormat as string) || 'yyyyMMddHHmmss', new Date()),
    (outputFormat as string) || defaultOutputFormat,
  );
};
