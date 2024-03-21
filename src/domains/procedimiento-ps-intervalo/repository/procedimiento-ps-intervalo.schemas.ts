import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProcedimientoPSIntervaloPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    intervalo: z.number(),
    valorInicial: z.number(),
    valorFinal: z.number(),
    productoSoftland: z.string(),
  }),
);
