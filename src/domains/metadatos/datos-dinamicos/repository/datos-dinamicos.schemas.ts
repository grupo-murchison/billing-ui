import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllDatosDinamicosPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    tablaId: z.number(),
    campoCodigo: z.string(),
    campoValor: z.string(),
    activo: z.boolean(),
  }),
);

export const getAllDatosDinamicosAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
