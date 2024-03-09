// import { userAvailability } from "../db/schema";
// import { db } from "..";
// import { eq, and } from "drizzle-orm";
// const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// function getNext7DaysWithDayNames() {
//     const today = new Date();
//     const next7Days = [];

//     for (let i = 0; i < 7; i++) {
//         const nextDay = new Date(today);
//         nextDay.setDate(today.getDate() + i);

//         const dayName = days[nextDay.getDay()];

//         next7Days.push({
//             date: nextDay.toISOString().split('T')[0],
//             day: dayName
//         });
//     }

//     return next7Days;
// }

// export async function checkAndUpdateAvailability(userEmail: string) {

//     let currentDate = new Date();
//     const date = currentDate.toISOString().split('T')[0];

//     const next7Days = getNext7DaysWithDayNames()

//     let res: Array<{ from: string, till: string, day: string, isAvail: boolean }> = [];

//     for (let i = 0; i < 7; i++) {

//         let verify = await db.select().from(userAvailability).where(
//             and(
//                 eq(userAvailability.email, userEmail),
//                 eq(userAvailability.avail, next7Days[i].date)
//             )
//         )

//         if (verify.length) {

//             if (typeof (verify[0].startTime) === "string" && typeof (verify[0].endTime) === "string")
//                 res.push({
//                     from: verify[0].startTime,
//                     till: verify[0].endTime,
//                     day: next7Days[i].day,
//                     isAvail: verify[0].isAvail
//                 })

//         } else if (next7Days[i].day === days[0] || next7Days[i].day === days[6]) {
//             res.push({ isAvail: false, day: next7Days[i].day, from: '0:00:00', till: '0:00:00' });
//         } else {
//             res.push({ from: '9:00:00', till: '5:00:00', day: next7Days[i].day, isAvail: true })
//         }
//     }

//     console.log("Successfully executed and Ready to login");

//     return res;
// }
// // reason why we send entire weeks availability is bcz we woudn't know changes in the availability if there are any also sending incomplete data will make it harder on frotend to implement