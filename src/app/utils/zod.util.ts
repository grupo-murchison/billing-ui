import z from 'zod';

export const withPagination = <T>(schema: z.ZodType<T>) => {
  return z.object({
    data: z.array(schema),
    meta: z.object({
      page: z.number(),
      itemCount: z.number(),
      pageCount: z.number(),
      hasPreviousPage: z.boolean(),
      hasNextPage: z.boolean(),
    }),
  });
};
