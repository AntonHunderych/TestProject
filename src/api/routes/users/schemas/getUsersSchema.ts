import z from 'zod';
import {createRespUserSchema} from "./createUserSchema";

export const getUsersRespSchema = z.object({
    data: z.array(createRespUserSchema),
    count: z.number()
});