import { zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const ProcedimientoPSIntervaloEditValidationSchema = z.object({
  id: z.number({ required_error: zodLocale.required_error }),
  productoSoftlandId: z.number({ required_error: zodLocale.required_error }),
  intervalo: z.number({ required_error: zodLocale.required_error }),
  valorInicial: z.number({ required_error: zodLocale.required_error }).min(0, { message: zodLocale.numberPositive }),
  valorFinal: z.number({ required_error: zodLocale.required_error }).min(0, { message: zodLocale.numberPositive }),
  procedimientoProductoSoftlandId: z.number({ required_error: zodLocale.required_error }),
});

export type ProcedimientoPSIntervaloEditFormDataType = z.infer<typeof ProcedimientoPSIntervaloEditValidationSchema>;
