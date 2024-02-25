import { Context } from "hono";
import { db } from "..";
import { checkAndUpdateAvailability } from "./handleAvailabilityOnLogin";
import { firstlogin } from "../db/schema";
import { eq } from "drizzle-orm";

export async function handleLogin(c: Context) {
    try {
        const { email }: { email: string } = await c.req.json();
        console.log(email);

        const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));
        console.log(cheq);
        c.status(200);

        if (cheq.length) {
            const res = await checkAndUpdateAvailability(email);
            return c.json({
                "message": "Successfully checked user exist",
                "success": true,
                data: res
            });
        }
        else return c.json({
            "message": "Successfully checked user has not visited before",
            "redirect": true,
            "success": false
        });

    } catch (error) {
        c.status(500);
        return c.json({ "message": "Internal Error try again after some time" });
    }
}