import { firstlogin } from "../db/schema";
import { db } from "..";
import { Context } from "hono";
import { eq } from "drizzle-orm";
// userAvailability
export async function handleOnUserRegister(c: Context) {
    try {
        console.log("???")
        const { email, slugName }: { email: string, slugName: string } = await c.req.json();
        console.log(slugName);

        if (typeof (slugName) === "undefined" || typeof (email) === "undefined") {
            throw new Error("internal server error")
        }

        const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));

        if (cheq.length > 0) return c.json({ "message": "User already exists", "redirect": true });
        await db.insert(firstlogin).values({ email: email, slug: slugName });

        c.status(200);
        return c.json({
            "message": "User registered succesfully"
        })
    } catch (error) {
        c.status(500);
        return c.json({ "message": "Internal Error try again after some time" });
    }
}

// let currentDate = new Date();
// const date = currentDate.toISOString().split('T')[0];
// //await db.insert(userAvailability).values({ email: email, avail: date, isAvail: true })