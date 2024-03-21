import { zodLocale } from '@app/utils/zod.util';
import z, { ZodType } from 'zod';

export type FormDataProcedimientoQCreate = {
  codigo: string;
  descripcion: string;
  denominacion: string;
  tipoProcedimientoQId: number | string;
  procedimientoBuiltinId: number | string | null;
  procedimientoCustomId: number | string | null;
};

export const ProcedimientoQCreateSchema: ZodType<FormDataProcedimientoQCreate> = z
  .object({
    codigo: z
      .string({ required_error: 'El campo es requerido.' })
      .min(1, { message: 'El campo es requerido.' })
      .max(50, { message: 'Ha superado el límite de caracteres' }),
    descripcion: z
      .string({ required_error: 'El campo es requerido.' })
      .min(1, { message: 'El campo es requerido.' })
      .max(250, { message: 'Ha superado el límite de caracteres' }),
    denominacion: z
      .string({ required_error: 'El campo es requerido.' })
      .min(1, { message: 'El campo es requerido.' })
      .max(50, { message: 'Ha superado el límite de caracteres' }),
    tipoProcedimientoQId: z.number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    procedimientoBuiltinId: z
      .number({
        required_error: zodLocale.required_error,
        invalid_type_error: zodLocale.required_error,
      })
      .nullable(),
    procedimientoCustomId: z
      .number({
        required_error: zodLocale.required_error,
        invalid_type_error: zodLocale.required_error,
      })
      .nullable(),
  })
  .refine(schema => (schema.tipoProcedimientoQId === 1 ? !!schema.procedimientoBuiltinId : true), {
    message: 'El campo es requerido.',
    path: ['procedimientoBuiltinId'],
  })
  .refine(schema => (schema.tipoProcedimientoQId === 2 ? !!schema.procedimientoCustomId : true), {
    message: 'El campo es requerido.',
    path: ['procedimientoCustomId'],
  })
  .refine(schema => schema.tipoProcedimientoQId !== null, {
    message: 'El campo es requerido.',
    path: ['tipoProcedimientoQId'],
  })
  .refine(schema => (schema.tipoProcedimientoQId === 3 ? !!schema.procedimientoBuiltinId : true), {
    message: 'Tipo de procedimiento no disponible.',
    path: ['tipoProcedimientoQId'],
  });

export type ProcedimientoQCreateSchemaType = z.infer<typeof ProcedimientoQCreateSchema>;
