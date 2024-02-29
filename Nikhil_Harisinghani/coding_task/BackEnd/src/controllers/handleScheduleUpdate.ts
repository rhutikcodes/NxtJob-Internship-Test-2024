import { Context } from "hono";
import { userAvailability, firstlogin } from "../db/schema";
import { db } from "..";
import { and, eq } from "drizzle-orm";
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export async function handleScheduleUpdate(e: Context) {

    try {
        const { email, payload }: {
            email: string,
            payload: Array<{ from: string, till: string, date: string, isAvail: boolean }>
        } = await e.req.json();
        console.log(payload.length);
        const res = await db.select().from(firstlogin).where(eq(firstlogin.email, email));

        if (res.length === 0) {
            return e.json({
                "message": "User has not Registered",
                "success": true
            })
        }

        await Promise.all(payload.map(async (ele) => {

            try {
                const res = await db.select().from(userAvailability).where(
                    and(
                        eq(userAvailability.email, email),
                        eq(userAvailability.avail, ele.date)
                    )
                )

                const specificDate = new Date(ele.date);
                const dayName = daysOfWeek[specificDate.getDay()];
                console.log(dayName);

                if (dayName === daysOfWeek[0] || dayName === daysOfWeek[6]) {

                    if (res.length) {

                        await db.delete(userAvailability).where(
                            and(
                                eq(userAvailability.email, email),
                                eq(userAvailability.avail, ele.date)
                            )
                        )

                        if (ele.isAvail) {
                            await db.insert(userAvailability).values({
                                email: email,
                                endTime: ele.till,
                                startTime: ele.from,
                                avail: ele.date,
                                isAvail: true
                            })
                        }

                    } else if (ele.isAvail) {
                        await db.insert(userAvailability).values({
                            email: email,
                            endTime: ele.till,
                            startTime: ele.from,
                            avail: ele.date,
                            isAvail: true
                        })
                    }

                } else {
                    // weekdays 
                    if (res.length) {
                        await db.delete(userAvailability).where(
                            and(
                                eq(userAvailability.email, email),
                                eq(userAvailability.avail, ele.date)
                            )
                        )

                        if (ele.from !== "9:00:00" || ele.till !== "5:00:00") {
                            console.log(ele.date);
                            await db.insert(userAvailability).values({
                                email: email,
                                avail: ele.date,
                                endTime: ele.till,
                                startTime: ele.from,
                                isAvail: ele.isAvail
                            })
                        }
                    } else if (ele.from !== "9:00:00" || ele.till !== "5:00:00") {
                        await db.insert(userAvailability).values({
                            email: email,
                            avail: ele.date,
                            endTime: ele.till,
                            startTime: ele.from,
                            isAvail: ele.isAvail
                        })
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }))

        return e.json({
            "message": "User data added successfully",
            "success": true
        });

    } catch (error) {
        console.log(error);
        console.log('Error')
        e.status(500);
        return e.json({
            "success": false,
            "message": "Internal server Error"
        })
    }
}
// any weekday 9-5 and off on weekends