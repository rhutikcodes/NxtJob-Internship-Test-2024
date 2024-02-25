import { Context } from "hono";
import { db } from "..";
import { userAvailability, userBookedSlots } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function handleGetSchedule(ctx: Context) {
    try {
        const { email }: { email: string } = await ctx.req.json();

        const today = new Date();
        const res: string[] = [];

        for (let i = 1; i < 7; i++) {
            const t = new Date(today);
            t.setDate(t.getDate() + i);
            const formattedDate = t.toDateString();
            res.push(formattedDate);
        }

        const resp: {
            email: string | null,
            avail: string,
            startTime: string | null,
            endTime: string | null,
            isAvail: boolean
        }[] = []

        await Promise.all(res.map(async (ele) => {

            let temp = await db.select().from(userAvailability).where(
                and(
                    eq(userAvailability.email, email),
                    eq(userAvailability.avail, ele)
                )
            )

            if (temp.length === 0) {
                const tempDate = new Date(ele);
                if (tempDate.getDay() === 0 || tempDate.getDay() === 0) {

                    resp.push({
                        email: email,
                        avail: ele,
                        startTime: "0:00:00",
                        endTime: "0:00:00",
                        isAvail: false,
                    })

                } else {
                    resp.push({
                        email: email,
                        avail: ele,
                        startTime: "9:00:00",
                        endTime: "5:00:00",
                        isAvail: true,
                    })
                }
            } else {
                resp.push({
                    email: email,
                    avail: ele,
                    startTime: temp[0].startTime,
                    endTime: temp[0].endTime,
                    isAvail: temp[0].isAvail
                })
            }

        }))

        return ctx.json({
            "success": true,
            "message": "Successfully fetched Data",
            payload: resp
        })

    } catch (error) {
        ctx.status(500);
        return ctx.json({
            "message": "Internal Server Error",
            "success": false
        })
    }

}