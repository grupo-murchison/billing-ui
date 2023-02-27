import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllContratoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    nroContrato: z.number().nullish(),
    tipoContrato: z.string().nullish(),
    modeloAcuerdo: z.string().nullish(),
    descripcion: z.string().nullish(),
    cliente: z.string().nullish(),
    // fechaInicioContrato: z.string(),
    // fechaFinContrato: z.string(),
    fechaInicioContrato: z.string().nullish(), // TODO ver con Sorro si admite null o undefined
    fechaFinContrato: z.string().nullish(),
  }),
);

export const getAllContratoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
