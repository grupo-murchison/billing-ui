import z, { ZodType } from 'zod';
import { zodId, zodLocale } from '@app/utils/zod.util';

export const EventoCreateSchema: ZodType<FormDataTypeEventoCreate> = z.object({
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

export type FormDataTypeEventoCreate = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  tipoNegocioId: number | string;
};

export type EventoCreateSchemaType = z.infer<typeof EventoCreateSchema>;
