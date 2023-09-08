import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

export const withPagination = <T>(schema: z.ZodType<T>) => {
  return z.object({
    data: z.array(schema),
    meta: z.object({
      itemCount: z.number(),
    }),
  });
};

export const DROPDOWN_ITEM_SCHEMA = z.object({
  value: z.string().or(z.number()),
  code: z.string(),
  label: z.string(),
  isDefault: z.boolean().optional(),
  parentCode: z.string().optional(),
});

export type DropdownItemType = z.infer<typeof DROPDOWN_ITEM_SCHEMA>;

export const DROPDOWN_SCHEMA = z.array(DROPDOWN_ITEM_SCHEMA);

export type DropdownSchemaType = z.infer<typeof DROPDOWN_SCHEMA>;

export const debugSchema = async (data: AnyValue, context: AnyValue, options: AnyValue, Schema: AnyValue) => {
  // you can debug your validation schema here
  console.log('formData debug data', data);
  console.log('formData debug options', options);

  console.log('validation result', await zodResolver(Schema)(data, context, options));
  return zodResolver(Schema)(data, context, options);
};

export const zodLocale = {
  required_error: 'El campo es requerido.',
  numberPositive: 'Debe ser mayor a 0',
  stringMax: (cant?: number) => `Ha superado el límite de ${cant || ''} caracteres`,
};

export const zodId = z.number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.required_error });
