import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProcedimientoPSPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    codigo: z.string(),
    denominacion: z.string(),
  }),
);
