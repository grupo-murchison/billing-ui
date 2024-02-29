import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllDatoDinamicoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    tablaDinamicaId: z.number(),
    codigo: z.string(),
    valor: z.string(),
    activo: z.boolean(),
  }),
);

export const getAllDatosDinamicosAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
