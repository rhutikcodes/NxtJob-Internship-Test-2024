import { Context } from "hono";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import jwt from '@tsndr/cloudflare-worker-jwt'

const pem_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwwbU3Y160v8AjhB8x6JkmSk6Aam/S6XdvhRx4wIEGnhhtJcgSAdOR+SMm093hzNN0itg4w7QLSUypqHl25xrP/zXMR+wr+Mxl8XGu39hx1svrcXtEJy0LwmZB3tc8XzCzfqDPO20DKg42SiCqvnLMeMOP8eMk4jWTtLMmRv5bC6ZPOz0Fdse2VlnMqhi6qXSS9L3Q1iujXB7zC4Qc/IpeeF2txMQHt/AmB2NBDhfSk7hIVfvMvoXKjRnnk3I1/XrhQ82+ZrcCt06X0nHLoqGZtU28ymnDdlaYR2iU3M1zYY6e61rjVZ4knNuMI/Xk2Z+fAQ2uWZsLJWexwrTtQMB6wIDAQAB"

const splitPem = pem_key?.match(/.{1,64}/g) ?? [];
const publicKey = "-----BEGIN PUBLIC KEY-----\n" + splitPem.join("\n") + "\n-----END PUBLIC KEY-----";


export async function handleLogin(c: Context) {

    try {
        const { token } = await c.req.json();
        // console.log(token);
        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;

        console.log(userId);
        // console.log(isValidToken);

        if (isValidToken) {
            const checkUserExistsOrNot = await db.select().from(users).where(eq(users.userId, userId))

            if (checkUserExistsOrNot.length > 0) {

                return c.json({
                    "message": "User Exists",
                    "success": true
                })

            } else {

                return c.json({
                    "message": "User does not Exists",
                    "success": false,
                    "redirect": 'sign-up'
                })

            }

        } else {

            return c.json({
                "message": "Token Expired or Invalid Token",
                "success": false,
                "redirect": 'sign-in'
            })

        }

    } catch (error) {

        c.status(500);
        return c.json({
            "message": "Internal Server Error",
            "success": true,
            "redirect": '/'
        })

    }

}