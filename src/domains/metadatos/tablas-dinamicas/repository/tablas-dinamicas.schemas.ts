import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllTablasDinamicasPaginatedSchema = ZodUtils.withPagination(
  z.object({
    id: z.number(),
    nombreTabla: z.string(),
    descripcionTabla: z.string(),
  }),
);

export const getAllTablasDinamicasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
