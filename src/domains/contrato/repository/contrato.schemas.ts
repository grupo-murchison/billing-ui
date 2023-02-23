import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllContratoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    nroContrato: z.number(),
    tipoContrato: z.string(),
    modeloAcuerdo: z.string(),
    descripcion: z.string(),
    cliente: z.string(),
    fechaInicioContrato: z.string(),
    fechaFinContrato: z.string(),
  }),
);

export const getAllContratoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
