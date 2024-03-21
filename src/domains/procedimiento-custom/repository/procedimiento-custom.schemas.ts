import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllProcedimientoCustomPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    funcionId: z.number().nullable(),
    accionId: z.number().nullable(),
    eventoId: z.number().nullable(),
    eventoCampoId: z.number().nullable(),
    codigo: z.string().nullable(),
    denominacion: z.string().nullable(),
    eventoCampoAgrupacionId: z.number().nullable(),
    expresionFiltro: z.string().nullable(),
    funcion: z.string().nullable(),
    accion: z.string().nullable(),
    evento: z.string().nullable(),
    eventoCampo: z.string().nullable(),
  }),
);

export const getAllProcedimientoCustomAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
