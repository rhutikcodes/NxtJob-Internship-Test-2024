// handled
import { Context } from "hono";
import { publicKey } from "./handleUserRegister";
import { userWeeklyAvailability } from "../db/schema";
import { db } from "..";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { eq } from "drizzle-orm";

export const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
type DayOfWeek = typeof daysofWeek[number];
type Payload = {
    [Key in DayOfWeek]: [string, string, boolean];
};

export async function handleWeeklyScheduleUpdate(ctx: Context) {
    try {
        const { payload }: { payload: Payload } = await ctx.req.json();
        const token = ctx.req.header('Authorization')

        if (typeof (token) === "undefined")
            return ctx.json({
                "message": "Token not provided",
                "success": false
            })

        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;

        console.log(payload);
        console.log(isValidToken);
        console.log(userId);

        let todaysDate = new Date().toISOString().split('T')[0]
        const { MON, TUE, WED, THU, FRI, SAT, SUN } = payload;

        if (isValidToken === false) {
            return ctx.json({
                "Message": "Invalid Token",
                "success": false
            })
        }

        const res = await db.update(userWeeklyAvailability).set({
            updatedAt: todaysDate,
            MONfrom: MON[2] ? MON[0] : '00:00:00',
            MONtill: MON[2] ? MON[1] : '00:00:00',
            TUEfrom: TUE[2] ? TUE[0] : '00:00:00',
            TUEtill: TUE[2] ? TUE[1] : '00:00:00',
            WEDfrom: WED[2] ? WED[0] : '00:00:00',
            WEDtill: WED[2] ? WED[1] : '00:00:00',
            THUfrom: THU[2] ? THU[0] : '00:00:00',
            THUtill: THU[2] ? THU[1] : '00:00:00',
            FRIfrom: FRI[2] ? FRI[0] : '00:00:00',
            FRItill: FRI[2] ? FRI[1] : '00:00:00',
            SATfrom: SAT[2] ? SAT[0] : '00:00:00',
            SATtill: SAT[2] ? SAT[1] : '00:00:00',
            SUNfrom: SUN[2] ? SUN[0] : '00:00:00',
            SUNtill: SUN[2] ? SUN[1] : '00:00:00'
        }).where(eq(userWeeklyAvailability.userId, userId));

        console.log(res);

        if (res.rowCount === 0) {
            await db.insert(userWeeklyAvailability).values({
                userId,
                updatedAt: todaysDate,
                MONfrom: MON[2] ? MON[0] : '00:00:00',
                MONtill: MON[2] ? MON[1] : '00:00:00',
                TUEfrom: TUE[2] ? TUE[0] : '00:00:00',
                TUEtill: TUE[2] ? TUE[1] : '00:00:00',
                WEDfrom: WED[2] ? WED[0] : '00:00:00',
                WEDtill: WED[2] ? WED[1] : '00:00:00',
                THUfrom: THU[2] ? THU[0] : '00:00:00',
                THUtill: THU[2] ? THU[1] : '00:00:00',
                FRIfrom: FRI[2] ? FRI[0] : '00:00:00',
                FRItill: FRI[2] ? FRI[1] : '00:00:00',
                SATfrom: SAT[2] ? SAT[0] : '00:00:00',
                SATtill: SAT[2] ? SAT[1] : '00:00:00',
                SUNfrom: SUN[2] ? SUN[0] : '00:00:00',
                SUNtill: SUN[2] ? SUN[1] : '00:00:00'
            })
        }

        return ctx.json({
            "Message": "Successfully Updated Availability",
            "success": true
        })

    } catch (err) {
        console.log(err)
        return ctx.json({
            "Message": "Something Went Wrong ",
            "success": false
        })
    }
}
