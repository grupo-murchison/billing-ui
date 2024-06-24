import { zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const ProcedimientoPSIntervaloCreateValidationSchema = z.object({
  procedimientoProductoSoftlandId: z.number({ required_error: zodLocale.required_error }),
  productoSoftlandId: z.number({ required_error: zodLocale.required_error }),
  intervalo: z.number({ required_error: zodLocale.required_error }),
  valorInicial: z.number({ required_error: zodLocale.required_error }).min(0, { message: zodLocale.numberPositive }),
  valorFinal: z.number({ required_error: zodLocale.required_error }).min(0, { message: zodLocale.numberPositive }),
});

export type ProcedimientoPSIntervaloCreateFormDataType = z.infer<typeof ProcedimientoPSIntervaloCreateValidationSchema>;
