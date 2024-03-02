import { Context } from "hono";
import { userBookedSlots } from "../db/schema";
import { db } from "..";
import { and, eq } from "drizzle-orm";

export async function handleGetMeetings(ctx: Context) {
    try {
        const { date, email }: { date: string, email: string } = await ctx.req.json();

        if (typeof (date) === "undefined" || typeof (email) === "undefined") {
            throw new Error("Internal server Error");
        }

        const res = await db.select().from(userBookedSlots).where(
            and(
                eq(userBookedSlots.email, email),
                eq(userBookedSlots.bookedDate, date)
            )
        )

        return ctx.json({
            "success": true,
            "message": "Succesfully fetched all of todays meetings",
            "data": res
        })

    } catch (error) {

        ctx.status(500);
        return ctx.json({
            "message": "Internal Server Error",
            "success": false
        })
    }

}