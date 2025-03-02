import {z} from 'zod';

export const RegisterFormSchema = z.object({
    email: z.string().email({message: 'Please provide a valid email address'}).trim(),
    password: z.string()
        .min(6, {message: 'Password must be at least 6 characters long'})
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {message: 'Password must contain at least one letter and one number'}),
    confirmPassword: z.string().min(6),
}).superRefine(({password, confirmPassword}, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
        })
    }
})