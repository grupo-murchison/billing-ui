import z from 'zod';

import { ZodUtils } from '@app/utils';

const ClienteRowDataGridSchema = z.object({
  id: z.number(),
  clienteId: z.string().nullish(),
  conceptoBusqueda: z.string().nullish(),
  descripcion: z.string().nullish(),
  paisId: z.number().nullish(),
});

export const getAllClienteAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;
export const getAllClientePaginated = ZodUtils.withPagination(ClienteRowDataGridSchema);

export type ClienteRowDataGridSchema = z.infer<typeof ClienteRowDataGridSchema>;
