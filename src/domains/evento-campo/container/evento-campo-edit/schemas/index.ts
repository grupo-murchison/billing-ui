import z, { ZodType } from 'zod';
import { zodId, zodLocale } from '@app/utils/zod.util';

export const EventoCampoEditSchema: ZodType<FormDataTypeEventoCampoEdit> = z
  .object({
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
      .max(250, { message: zodLocale.stringMax(250) }),
    campo: z
      .string({ required_error: zodLocale.required_error })
      .min(1, { message: zodLocale.required_error })
      .max(50, { message: zodLocale.stringMax(250) }),
    eventoId: zodId,
    tipoDatoId: zodId,
    tablaDinamicaId: z.number({ required_error: zodLocale.required_error }).nullable(),
  })
  .refine(schema => (schema.tipoDatoId === 4 ? !!schema.tablaDinamicaId : true), {
    message: zodLocale.required_error,
    path: ['tablaDinamicaId'],
  });

export type FormDataTypeEventoCampoEdit = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  campo: string;
  eventoId: number | string;
  tipoDatoId: number | string;
  tablaDinamicaId: number | string | null;
};

export type EventoCampoEditSchemaType = z.infer<typeof EventoCampoEditSchema>;
