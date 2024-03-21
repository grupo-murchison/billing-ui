import z, { ZodType } from 'zod';
import { zodId, zodLocale } from '@app/utils/zod.util';

export const EventoEditSchema: ZodType<FormDataTypeEventoEdit> = z.object({
  codigo: z
    .string({ required_error: zodLocale.required_error })
    .min(1, { message: zodLocale.required_error })
    .max(50, { message: zodLocale.stringMax(250) }),
  denominacion: z
    .string({ required_error: zodLocale.required_error })
    .min(1, { message: zodLocale.required_error })
    .max(50, { message: zodLocale.stringMax(250) }),
  descripcion: z
    .string({ required_error: zodLocale.required_error })
    .min(1, { message: zodLocale.required_error })
    .max(50, { message: zodLocale.stringMax(250) }),
  tipoNegocioId: zodId,
});

export type FormDataTypeEventoEdit = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  tipoNegocioId: number | string;
};

export type EventoEditSchemaType = z.infer<typeof EventoEditSchema>;
