import { Context } from "hono";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { publicKey } from "./handleUserRegister";
import { users, userWeeklyAvailability } from "../db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export async function handleGetWeeklySchedule(ctx: Context) {

    try {
        const { token, date } = await ctx.req.json();
        const dayOfBooking: typeof days[number] = days[new Date(date).getDay()]
        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;
        // add valid token if
        if (isValidToken === false) {
            return ctx.json({
                "Message": "Invalid Token",
                "success": false
            })
        }

        const availabilityOfUserOnThatDay = await db.select().from(users).
            innerJoin(userWeeklyAvailability,
                eq(users.userId, userWeeklyAvailability.userId)).
            where(
                eq(
                    users.userId,
                    userId
                )
            )

        const availableFrom = availabilityOfUserOnThatDay[0].userWeeklyAvailability[`${dayOfBooking}from`];
        const availableTill = availabilityOfUserOnThatDay[0].userWeeklyAvailability[`${dayOfBooking}till`];

        console.log(availableFrom);
        console.log(availableTill);

        return ctx.json({
            "message": "Success",
            "success": true,
            availableFrom,
            availableTill
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }

}

// spice it in parts(30mins for now) -> fetch results from slotsTable remove those parts and return as payload 