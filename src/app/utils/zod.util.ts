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

export const debugSchema = async (data: any, context: any, options: any, Schema: any) => {
  // you can debug your validation schema here
  console.log('formData debug data', data);
  console.log('formData debug options', options);

  console.log('validation result', await zodResolver(Schema)(data, context, options));
  return zodResolver(Schema)(data, context, options);
};
