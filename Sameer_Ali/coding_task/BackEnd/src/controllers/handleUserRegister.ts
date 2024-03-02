import { users } from "../db/schema";
import { db } from "..";
import { Context } from "hono";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { eq } from "drizzle-orm";

const pem_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwwbU3Y160v8AjhB8x6JkmSk6Aam/S6XdvhRx4wIEGnhhtJcgSAdOR+SMm093hzNN0itg4w7QLSUypqHl25xrP/zXMR+wr+Mxl8XGu39hx1svrcXtEJy0LwmZB3tc8XzCzfqDPO20DKg42SiCqvnLMeMOP8eMk4jWTtLMmRv5bC6ZPOz0Fdse2VlnMqhi6qXSS9L3Q1iujXB7zC4Qc/IpeeF2txMQHt/AmB2NBDhfSk7hIVfvMvoXKjRnnk3I1/XrhQ82+ZrcCt06X0nHLoqGZtU28ymnDdlaYR2iU3M1zYY6e61rjVZ4knNuMI/Xk2Z+fAQ2uWZsLJWexwrTtQMB6wIDAQAB"

const splitPem = pem_key?.match(/.{1,64}/g) ?? [];
const publicKey = "-----BEGIN PUBLIC KEY-----\n" + splitPem.join("\n") + "\n-----END PUBLIC KEY-----";

export async function handleOnUserRegister(c: Context) {
    try {
        const { slug, email, token } = await c.req.json();
        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;

        if (isValidToken) {
            const checkInUsersDB = await db.select().from(users).where(eq(users.email, email));

            if (checkInUsersDB.length) {
                return c.json({
                    "message": "User Already Exists",
                    "success": true
                })
            }

            console.log(email);
            console.log(slug);
            console.log(userId);


            await db.insert(users).values({
                email,
                slug,
                userId,
            })

            return c.json({
                "message": "User Registration Successful",
                "success": true
            })

        } else {
            return c.json({
                "message": "Invalid Token",
                "success": true
            })
        }
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            "message": "Something Went wrong",
            "success": false
        })
    }
}