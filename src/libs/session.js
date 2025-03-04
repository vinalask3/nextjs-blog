import "server-only";
import { jwtVerify } from "jose";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

const encodedKey =  new TextDecoder().encode(secretKey);

export async function encrypt(payload) {
    return new SignJWT(payload
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
    ).sign(encodedKey);
}

export async function decrypt(token) {
    try{
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch(e){
        console.log("Failed to verify session...");
        return null;
    }
}

export async function createSession(userId){
    // Expires in 7 days
    const expiryDate =  new Date() + 1000 * 60 * 60 * 24 * 7;
    const token = await encrypt({userId, expiryDate});

    const cookieStore = cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: true, // process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    })
    // return token;
}