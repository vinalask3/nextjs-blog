"use server"

import { RegisterFormSchema } from "@/libs/rules"
import { getCollection } from "@/libs/db"
import bcrypt from "bcrypt"
import { redirect } from "next/dist/server/api-utils"
import { createSession } from "@/libs/session"

export async function Register(state, formData){
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    })

    // Return if validation fails
    if(! validatedFields.success){
        return {
            success: false,
            message: validatedFields.error.issues[0].message,
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        }
    }

    // Destructure validated fields and get user collection
    const { email, password } = validatedFields.data;
    const userCollection = await getCollection("users");

    if(userCollection === null){
        return {
            errors: {email: "Database connection error"},
            success: false,
            message: "Database connection error",
        }
    }
    // Check if user already exists in collection
    const existingUser = await userCollection.findOne({email});

    if(existingUser !== null){
        return {
            errors: {email: "Email already exists"},
            success: false,
            message: "Email already exists",
        }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await userCollection.insertOne({    
        email,
        password: hashedPassword,
    });

    // create session. 
    // This could also be where you fire a verification email and redirect user to a 'success' page

    await createSession(result.insertedId.toString());
    // const session = await createSession(result.insertedId);


    // Redirect with success message
    redirect("/dashboard");

    console.log(result);
}