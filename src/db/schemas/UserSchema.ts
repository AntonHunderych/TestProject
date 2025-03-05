import z from 'zod';

export const UserSchema = z.object({
    id: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().nonempty().email(),
    password: z.string().nonempty(),
});