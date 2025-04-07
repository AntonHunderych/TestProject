import { createCommandSchema } from './createCommandSchema';
import z from 'zod';

export const updateCommandSchema = createCommandSchema.extend({
  commandId: z.string(),
});
