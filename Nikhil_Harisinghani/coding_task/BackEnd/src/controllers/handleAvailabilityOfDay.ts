import { Context } from "hono";
import { db } from "..";
import { userBookedSlots, userWeeklyAvailability, users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { daysofWeek } from "./handleWeeklyScheduleUpdate";

function generateIntervals(startTime: any, endTime: any, intervalMinutes = 30) {

    const intervals = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const numIntervals = Math.floor((endTotalMinutes - startTotalMinutes) / intervalMinutes);

    for (let i = 0; i <= numIntervals; i++) {
        const currentStartMinutes = startTotalMinutes + i * intervalMinutes;
        const currentEndMinutes = currentStartMinutes + intervalMinutes;

        const formatTime = (totalMinutes: any) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };

        intervals.push({
            start: formatTime(currentStartMinutes),
            end: formatTime(currentEndMinutes),
        });
    }

    return intervals;
}

function getNonIntersectingIntervals(intervals1: any, intervals2: any) {
    const nonIntersectingIntervals = [];

    for (const interval1 of intervals1) {
        let intersects = false;

        for (const interval2 of intervals2) {
            const start1 = new Date(`1970-01-01T${interval1.start}Z`);
            const end1 = new Date(`1970-01-01T${interval1.end}Z`);
            const start2 = new Date(`1970-01-01T${interval2.start}Z`);
            const end2 = new Date(`1970-01-01T${interval2.end}Z`);

            if (!(end1 <= start2 || start1 >= end2)) {
                intersects = true;
                break;
            }
        }

        if (!intersects) {
            nonIntersectingIntervals.push(interval1);
        }
    }

    return nonIntersectingIntervals;
}

export async function handleAvailabilityOfDay(ctx: Context) {
    try {
        const { slug, date }: { slug: string, date: string } = await ctx.req.json();
        const inputDate = new Date(date);
        let day = daysofWeek[inputDate.getDay()];
        const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
        console.log(slug);
        console.log(date);
        const data = await db.select().from(users).innerJoin(userWeeklyAvailability,
            eq(userWeeklyAvailability.userId, users.userId)).where(eq(users.slug, slug));

        if (data[0].userWeeklyAvailability[`${day}from`] === data[0].userWeeklyAvailability[`${day}till`]) {

            return ctx.json({
                "success": true,
                "returnPayload": []
            })

        }

        const allIntervals = generateIntervals(data[0].userWeeklyAvailability[`${day}from`], data[0].userWeeklyAvailability[`${day}till`]);
        const bookedIntervals = await db.select().from(users).innerJoin(userBookedSlots, eq(users.userId, userBookedSlots.userId)).where(and(eq(users.slug, slug), eq(userBookedSlots.bookedDate, formattedDate)))

        let intervals2: any[] = []

        bookedIntervals.forEach((tuple) => {
            intervals2.push({ start: tuple.userBookedSlots.startTime, end: tuple.userBookedSlots.endTime })
        })

        console.log(allIntervals);
        console.log(intervals2);


        const returnPayload = getNonIntersectingIntervals(allIntervals, intervals2)

        return ctx.json({
            "success": true,
            returnPayload
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "something went wrong",
            "success": false
        })
    }
}