import z from 'zod';

import { ZodUtils } from '@app/utils';

const FacturasRowDataGridSchema = z.object({
  id: z.number(),
  clienteDescripcion: z.string().nullish(),
  clienteId: z.number().nullish(),
  contratoDescripcion: z.string().nullish(),
  denominación: z.string().nullish(),
  estado: z.string().nullish(),
  facturacionCabeceraEstado: z.string().nullish(),
  facturacionCabeceraNumeroSecuenciaFacturacion: z.string().nullish(),
  fechaCalculoDesde: z.string().nullish(),
  numeroSecuenciaContrato: z.string().nullish(),
  periodo: z.string().nullish(),
});

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>;
