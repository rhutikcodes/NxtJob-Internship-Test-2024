import { Context } from "hono"
import { db } from "..";
import { userAvailability, userBookedSlots } from "../db/schema";
import { and, eq } from "drizzle-orm";
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function doTimeIntervalsIntersect(interval1: [string, string], interval2: [string, string]): boolean {
    const [start1, end1] = interval1.map(time => new Date(`1970-01-01T${time}`));
    const [start2, end2] = interval2.map(time => new Date(`1970-01-01T${time}`));

    // Check for intersection
    return start1 <= end2 && end1 >= start2;
}

export async function handleSlotBooking(e: Context) {
    const { emailTo, emailFrom, meetStart, meetEnd, date }: {
        emailTo: string,
        emailFrom: string,
        meetStart: string,
        meetEnd: string,
        date: string
    } = await e.req.json();

    // 1 -> check availability for both on that day
    const userTo = await db.select().from(userAvailability).where(and(
        eq(userAvailability.email, emailTo),
        eq(userAvailability.avail, date)
    ))

    if (userTo.length) {
        if (userTo[0].isAvail === false) {
            return e.json({
                "Message": "Other User is On Leave",
                "success": false
            })
        }
    } else {
        const specificDate = new Date(date);
        const dayName = daysOfWeek[specificDate.getDay()];
        if (dayName === daysOfWeek[0] || dayName === daysOfWeek[6]) {
            return e.json({
                "Message": "Other User is not free",
                "success": false
            })
        }
    }


    // 2 -> check wether slot is free or not
    const userToBooking = await db.select().from(userBookedSlots).where(and(
        eq(userBookedSlots.email, emailTo),
        eq(userBookedSlots.bookedDate, date)
    ))

    let isUserToFree: boolean = true;

    userToBooking.forEach((ele) => {
        if (doTimeIntervalsIntersect([meetStart, meetEnd], [ele.bookedFrom, ele.bookedTill])) {
            isUserToFree = false;
        }
    })

    if (!isUserToFree) {
        return e.json({
            "Message": "Other User is not free",
            "success": false
        })
    }

    const userFromBooking = await db.select().from(userBookedSlots).where(and(
        eq(userBookedSlots.email, emailFrom),
        eq(userBookedSlots.bookedDate, date)
    ))

    let isUserFromFree: boolean = true;
    userFromBooking.forEach((ele) => {
        if (doTimeIntervalsIntersect([meetStart, meetEnd], [ele.bookedFrom, ele.bookedTill])) {
            isUserFromFree = false;
        }
    })

    if (!isUserFromFree) {
        return e.json({
            "Message": "You are not free",
            "success": false
        })
    }
    await db.insert(userBookedSlots).values({ email: emailFrom, bookedFrom: meetStart, bookedTill: meetEnd, bookedDate: date })
    await db.insert(userBookedSlots).values({ email: emailTo, bookedFrom: meetStart, bookedTill: meetEnd, bookedDate: date })
    return e.json({
        "message": "Meeting scheduled",
        "success": "true"
    })
}

// Wont be required if user cannot set meetings on holiday
// const userFrom = await db.select().from(userAvailability).where(and(
//     eq(userAvailability.email, emailFrom),
//     eq(userAvailability.avail, date)
// ))

// if (userFrom.length) {
//     if (userFrom[0].isAvail === false) {
//         return e.json({
//             "Message": "You are not free",
//             "success": false
//         })
//     }
// } else {
//     const specificDate = new Date(date);
//     const dayName = daysOfWeek[specificDate.getDay()];
//     if (dayName === daysOfWeek[0] || dayName === daysOfWeek[6]) {
//         return e.json({
//             "Message": "You are not free",
//             "success": false
//         })
//     }
// }