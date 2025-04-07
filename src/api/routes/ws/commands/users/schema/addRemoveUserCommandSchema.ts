import z from 'zod';

export const addRemoveUserCommandSchema = z.object({
  commandId: z.string(),
  userId: z.string(),
});
