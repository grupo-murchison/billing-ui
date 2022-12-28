import z from 'zod';

export const ContratoEditSchema = z.object({
  tipoContratoId: z.number({ required_error: 'El campo es requerido.' }),
  clienteId: z.number({ required_error: 'El campo es requerido.' }),
  modeloAcuerdoId: z.number({ required_error: 'El campo es requerido.' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  fechaInicioContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(),
  fechaFinContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(),
});

export type ContratoEditSchemaType = z.infer<typeof ContratoEditSchema>;
