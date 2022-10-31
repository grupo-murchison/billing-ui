import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProcedimientoQPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    codigo: z.string(),
    descripcion: z.string(),
    denominacion: z.string(),
    tipoProcedimientoQ: z.string(),
    tipoProcedimientoBuiltin: z.string(),
    tipoProcedimientoCustom: z.string(),
  }),
);

export const getAllProcedimientoQAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
