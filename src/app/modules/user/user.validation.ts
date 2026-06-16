import { z } from 'zod';
import { User_Status } from '../../utilities/constant';

const userValidationSchema = z.object({
    pasword: z
        .string({
            invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(Object.values(User_Status) as [string, ...string[]]),
    }),
});
export const UserValidation = {
    userValidationSchema,
    changeStatusValidationSchema,
};