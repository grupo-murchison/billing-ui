import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllConceptoAcuerdoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    modeloAcuerdoId: z.number(),
    tipoServicioId: z.number(),
    procedimientoQId: z.number(),
    procedimientoPId: z.number(),
    procedimientoProductoSoftlandId: z.number(),
    descripcion: z.string(),
    tipoServicio: z.string(),
    procedimientoQ: z.string(),
    procedimientoP: z.string(),
    procedimientoProductoSoftland: z.string(),
  }),
);
