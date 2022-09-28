import { format, parse } from 'date-fns';

export const parseToDBString = (inputDate: Nullable<Date>) => {
  if (!inputDate) return undefined;

  return format(inputDate, 'yyyyMMdd');
};

export const parseFromDBString = (inputDateStr: string) => {
  return parse(inputDateStr, 'yyyyMMdd', new Date());
};

export const beautifyDBString = (inputDateStr: string) => {
  const parsedDate = parseFromDBString(inputDateStr);
  return format(parsedDate, 'dd-MM-yyyy');
};
