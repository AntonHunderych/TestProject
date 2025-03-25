import z from 'zod';
import { loginSchema } from './loginSchema';

export const registerSchema = loginSchema.extend({
  username: z.string().min(3).max(100),
});
