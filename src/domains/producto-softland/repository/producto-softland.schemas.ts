import { ValidationLib } from '@libs';

export const getAllProductoSoftlandPaginatedSchema = ValidationLib.array(
  ValidationLib.object({
    id: ValidationLib.number(),
    agrupacion: ValidationLib.string(),
    codigo: ValidationLib.string(),
    descripcion: ValidationLib.string(),
    activo: ValidationLib.boolean(),
    fechaCambioEstado: ValidationLib.string(),
  }),
);

export type GetAllProductoSoftlandPaginatedSchemaType = ValidationLib.infer<
  typeof getAllProductoSoftlandPaginatedSchema
>;
