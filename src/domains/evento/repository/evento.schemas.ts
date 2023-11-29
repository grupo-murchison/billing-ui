import z from 'zod';

import { ZodUtils } from '@app/utils';

export const getAllEventoPaginatedSchema = ZodUtils.withPagination(
    z.object({
      id: z.number(),
      codigo: z.string(),
      denominacion: z.string(),
      descripcion: z.string(),
      tipoNegocio: z.string(),
    }),
  );

export const getAllEventoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
