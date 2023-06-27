import z from 'zod';

import { ZodUtils } from '@app/utils';

const FacturasRowDataGridSchema = z.object({
  id: z.number(),
  numeroSecuenciaContrato: z.string().nullish(),
  estado: z.string().nullish(),
  contratoDescripcion: z.string().nullish(),
  clienteDescripcion: z.string().nullish(),
  facturacionCabeceraEstado: z.string().nullish(),
});

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>