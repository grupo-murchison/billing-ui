import z from 'zod';

export const withPagination = <T>(schema: z.ZodType<T>) => {
  return z.object({
    data: z.array(schema),
    meta: z.object({
      itemCount: z.number(),
    }),
  });
};

export const DROPDOWN_SCHEMA = z.array(
  z.object({
    value: z.string().or(z.number()),
    label: z.string(),
  }),
);

export type DropdownSchemaType = z.infer<typeof DROPDOWN_SCHEMA>;
