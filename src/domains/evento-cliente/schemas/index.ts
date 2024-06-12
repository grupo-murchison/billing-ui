import z from 'zod';
import { autoCompleteFields, dateOrNullTuple } from '@app/utils/zod.util';

export type EventClientSearchFiltersFormDataType = {
  clienteId: {
    value: number;
    code: string;
    label: string;
  } | null;
  rangoFechas: [Date, Date] | [];
  eventoId:
    | {
        value: number;
        code: string;
        label: string;
      }[]
    | [];
};

export const EventClientSearchFiltersValidationSchema = z
  .object({
    clienteId: z.union([autoCompleteFields, z.null()]),
    rangoFechas: z.union([dateOrNullTuple, z.array(z.never())]),
    eventoId: z.union([z.array(autoCompleteFields), z.array(z.null())]),
  })
  .superRefine((data, ctx) => {
    const { rangoFechas } = data;
    if (Array.isArray(rangoFechas) && rangoFechas[0] && rangoFechas[0] !== null && rangoFechas[1] === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El segundo parámetro de fecha es requerido.',
        path: ['rangoFechas', 1],
      });
    }
  });

export type EventosClienteFormSchemaType = z.infer<typeof EventClientSearchFiltersValidationSchema>;
