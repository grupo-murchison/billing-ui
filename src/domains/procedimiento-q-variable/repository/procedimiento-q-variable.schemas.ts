import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProcedimientoQVariablePaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    tipoId: z.number(),
    diccionarioId: z.number(),
    codigo: z.string(),
    nombre: z.string(),
    tipo: z.string(),
    diccionario: z.string(),
  }),
);
