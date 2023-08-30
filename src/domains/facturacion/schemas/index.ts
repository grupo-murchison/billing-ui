import z from 'zod';

export const FacturacionReversionCreateSchema = z.object({
  clienteId: z.object({ 
    value: z.number({ required_error: 'El campo es requerido.' }),
    code: z.string({ required_error: 'El campo es requerido.' }),
    label: z.string({ required_error: 'El campo es requerido.' })
  }, { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  numeroSecuenciaFacturacion: z.string({ }),
  nroContrato: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
});

export type FacturacionReversionFormSchemaType = z.infer<typeof FacturacionReversionCreateSchema>;

export const FacturacionReporteCreateSchema = z.object({
    clienteId: z.object({ 
      value: z.number({ required_error: 'El campo es requerido.' }),
      code: z.string({ required_error: 'El campo es requerido.' }),
      label: z.string({ required_error: 'El campo es requerido.' })
    }, { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
    numeroSecuenciaFacturacion: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
    nroContrato: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
    fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
    fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  });
  
export type FacturacionReporteFormSchemaType = z.infer<typeof FacturacionReporteCreateSchema>;
  