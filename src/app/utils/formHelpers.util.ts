import { EventoCampoDropdownSchemaType } from '@domains/evento-campo/repository/evento-campo.schemas';
import { DropdownSchemaType } from './zod.util';

// Se usa en ProcedimientoCustom
export const mapearParametros = (options: DropdownSchemaType) => {
  return options.map(data => {
    return {
      code: data.value,
      label: data.label,
      value: data.code,
    };
  });
};

export const findPropertyById = (options: DropdownSchemaType, search: string | number) => {
  return options.find(({ value }) => value === search);
};

export const findPropertyByCode = (options: DropdownSchemaType, search: string | number | null | undefined) => {
  return options.find(({ code }) => code === search);
};

export const findEventoCampoByCode = (
  options: EventoCampoDropdownSchemaType,
  search: string | number | null | undefined,
) => {
  return options.find(({ code }) => code === search);
};

export const findPropertyByLabel = (options: DropdownSchemaType, search: string) => {
  return options.find(({ label }) => label.includes(search));
};

export const reMapFormSelectOptions = (options: DropdownSchemaType) => {
  return options.map(data => {
    return {
      code: data.value,
      label: data.label,
      value: data.code,
    };
  });
};
