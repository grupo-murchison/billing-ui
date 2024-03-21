import z from 'zod';

export const ProcedimientoCustomCreateSchema = z
.object({
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  denominacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  funcionCode: z.string({ required_error: 'El campo es requerido.' }),
  eventoCode: z.union([z.string({ required_error: 'El campo es requerido.' }), z.literal('')]),
  eventoCampoCode: z.union([z.string(), z.literal('')]).nullish(),
  accionCode: z.union([z.string(), z.literal(''), z.literal('FIL')]).nullish(),
  filtroCampoCode: z.union([z.string(), z.literal('')]).nullish(),
  filtroValue: z.string().optional(),
})
.superRefine(({ funcionCode, eventoCode, eventoCampoCode, accionCode, filtroCampoCode, filtroValue }, ctx) => {
  if (!funcionCode) {
    ctx.addIssue({
      code: 'custom',
      message: 'Funcion es requerido.',
      path: ['funcionCode'],
      fatal: true,
    });
    
    return z.never;
  } else {
    if (!eventoCode) {
      ctx.addIssue({
        code: 'custom',
        message: 'Evento es requerido.',
        path: ['eventoCode'],
      });
    }

    if (funcionCode && !eventoCampoCode) {
      ctx.addIssue({
        code: 'custom',
        message: 'Campo es requerido.',
        path: ['eventoCampoCode'],
      });
    }
  }

  if (accionCode && accionCode === 'AGR') {
    // AGR
    if (!filtroCampoCode) {
      ctx.addIssue({
        code: 'custom',
        message: 'Para agrupar, Campo es requerido.',
        path: ['filtroCampoCode'],
      });
    }
  } else if (accionCode && accionCode === 'FIL') {
    // FIL
    if (!filtroCampoCode) {
      ctx.addIssue({
        code: 'custom',
        message: 'Para filtrar, Campo es requerido.',
        path: ['filtroCampoCode'],
      });
    }

    if (!filtroValue) {
      ctx.addIssue({
        code: 'custom',
        message: 'Para filtrar, Valor es requerido.',
        path: ['filtroValue'],
      });
    }
  }
});

export type ProcedimientoCustomCreateSchemaType = z.infer<typeof ProcedimientoCustomCreateSchema>;
