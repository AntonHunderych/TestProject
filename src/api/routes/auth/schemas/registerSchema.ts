import z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
