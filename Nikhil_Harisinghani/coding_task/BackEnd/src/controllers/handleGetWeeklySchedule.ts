import { Context } from "hono";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { publicKey } from "./handleUserRegister";
import { users, userWeeklyAvailability } from "../db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export async function handleGetWeeklySchedule(ctx: Context) {

    try {
        const token = ctx.req.header('Authorization');

        if (typeof (token) === "undefined")
            return ctx.json({
                "message": "Token not present",
                "success": false
            })

        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId1 = decodedToken.payload.sub;

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
                    userId1
                )
            )

        const weeklyAvailablility = availabilityOfUserOnThatDay[0].userWeeklyAvailability
        const { userId, updatedAt, ...tempObj } = weeklyAvailablility;
        const respPayload: any = {}

        daysOfWeek.forEach((day) => {
            let r1 = tempObj[`${day}from`]?.slice(0, -3);
            let r2 = tempObj[`${day}till`]?.slice(0, -3);

            respPayload[day] = [r1, r2, !(r1 === r2)];
        })

        return ctx.json({
            "message": "Success",
            "success": true,
            respPayload
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }

}