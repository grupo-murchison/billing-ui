import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProductoSoftlandPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    agrupacion: z.string(),
    codigo: z.string(),
    descripcion: z.string(),
    activo: z.boolean(),
    fechaCambioEstado: z.string(),
  }),
);
