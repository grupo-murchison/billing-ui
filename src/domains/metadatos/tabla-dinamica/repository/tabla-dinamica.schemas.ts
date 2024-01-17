import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllTablaDinamicaPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    codigo: z.string(),
  }),
);

export const getAllTablaDinamicaAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
