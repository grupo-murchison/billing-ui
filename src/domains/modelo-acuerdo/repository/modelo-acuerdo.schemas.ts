import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllModeloAcuerdoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    codigo: z.string(),
    descripcion: z.string(),
  }),
);
