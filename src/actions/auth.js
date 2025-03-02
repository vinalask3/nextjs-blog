"use server"

import { RegisterFormSchema } from "@/libs/rules"

export async function Register(state, formData){
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    })

    if(! validatedFields.success){
        return {
            success: false,
            message: validatedFields.error.issues[0].message,
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        }
    }
}