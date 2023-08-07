import { format, parse, parseISO } from 'date-fns';

export const parseToDBString = (inputDate: Nullable<Date>) => {
  if (!inputDate) return undefined;

  return format(inputDate, 'yyyyMMdd');
};

export const parseFromDBString = (inputDateStr: string) => {
  return parse(inputDateStr, 'yyyyMMdd', new Date());
};

export const beautifyDBString = (inputDateStr?: Nullable<string>) => {
  if (!inputDateStr) return undefined;

  const parsedDate = parseFromDBString(inputDateStr);
  return format(parsedDate, 'dd-MM-yyyy');
};

export const beautifyISO = (inputDate: Nullable<string>) => {
  if (!inputDate) return undefined;

  return format(parseISO(inputDate), 'dd-MM-yyyy');
};
