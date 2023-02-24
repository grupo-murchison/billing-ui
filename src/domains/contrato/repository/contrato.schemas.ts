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
    // fechaInicioContrato: z.string(), 
    // fechaFinContrato: z.string(),
    fechaInicioContrato: z.string().nullish(), // TODO ver con Sorro si admite null o undefined
    fechaFinContrato: z.string().nullish(),
  }),
);

export const getAllContratoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
