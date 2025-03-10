"use server"

import bcrypt from "bcryptjs"
import { LoginFormSchema, RegisterFormSchema } from "@/libs/rules"
import { getCollection } from "@/libs/db"
import { redirect } from "next/dist/server/api-utils"
import { createSession } from "@/libs/session"

export async function Register(state, formData){
    console.log('Entered function')
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
    console.log('Validation passed.')

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

    await createSession(result.insertedId);

    // Redirect with success message
    redirect("/dashboard");

}

export async function Login(state, formData){
    // validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'), 
        password: formData.get('password')
    });
    // Did validation pass?
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().error,
            email: formData.get('email')
        }
    }
    // Does email exist in database (is user already registered?)
    const userCollection = await getCollection('users');
    if(!userCollection){
        return {errors: {email: "Server error!"}}
    }
    existingUser = await userCollection.findOne({email});
    if(!existingUser){
        return {errors: {email: "Invalid credentials"}}
    }

    const matchedPassword = await bcrypt.compare(password, existingUser.password);

    if(!matchedPassword){
        return {errors: {email: "Invalid credentials"}}
    }

    // All good, create session
    await createSession(existingUser._id.toString());

    redirect('/dashboard');
}