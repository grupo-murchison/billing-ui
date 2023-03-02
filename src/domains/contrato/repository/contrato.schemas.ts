import z from 'zod';

import { ZodUtils } from '@app/utils';

const ContratoRowDataGridSchema = z.object({
  id: z.number(),
  nroContrato: z.string().nullish(),
  tipoContrato: z.string().nullish(),
  modeloAcuerdo: z.string().nullish(),
  descripcion: z.string().nullish(),
  cliente: z.string().nullish(),
  fechaInicioContrato: z.string().nullish(),
  fechaFinContrato: z.string().nullish(),
});

export const getAllContratoPaginatedSchema = ZodUtils.withPagination(ContratoRowDataGridSchema);

export const getAllContratoAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type ContratoRowDataGridSchema = z.infer<typeof ContratoRowDataGridSchema>