import z, { ZodType } from 'zod';
import { FormDataLogin } from './auth.types';

export const ValidationSchemaLogin: ZodType<FormDataLogin> = z.object({
  username: z
    .string({ required_error: 'El usuario es requerido, debe ser un email.' })
    .min(1, { message: 'El usuario es requerido, debe ser un email.' })
    .email({ message: 'Email inválido.' }),
  password: z.coerce
    .string({ required_error: 'La contraseña es requerida.' })
    .min(1, { message: 'La contraseña es requerida.' }),
  rememberMe: z.boolean(),
});
