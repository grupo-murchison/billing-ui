import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllModeloAcuerdoPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    codigo: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
  }),
);

export const getAllModeloAcuerdoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
