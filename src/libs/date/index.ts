import { format, parse } from 'date-fns';

export const parseToDBString = (inputDate: Nullable<Date>) => {
  if (!inputDate) return undefined;

  return format(inputDate, 'yyyyMMdd');
};

export const parseFromDBString = (inputDateStr: string) => {
  return parse(inputDateStr, 'yyyy-MM-dd', new Date());
};

export const beautifyDBString = (inputDateStr: string) => {
  const parsedDate = parse(inputDateStr, 'yyyyMMdd', new Date());
  return format(parsedDate, 'dd-MM-yyyy');
};
