import { zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const ProcedimientoPSEditValidationSchema = z.object({
  codigo: z
    .string({ required_error: zodLocale.required_error })
    .min(1, { message: zodLocale.required_error })
    .max(50, { message: zodLocale.stringMax(50) }),
  denominacion: z
    .string({ required_error: zodLocale.required_error })
    .min(1, { message: zodLocale.required_error })
    .max(250, { message: zodLocale.stringMax(250) }),
});

export type ProcedimientoPSEditFormDataType = z.infer<typeof ProcedimientoPSEditValidationSchema>;
