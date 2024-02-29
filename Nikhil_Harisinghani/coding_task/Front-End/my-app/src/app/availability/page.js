"use client"
import { useUser, useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const initialSchedule = {
    from: 9,
    to: 5,
};



export default function page() {
    const { userId, getToken } = useAuth()
    const { user } = useUser();
    const [date, setDate] = useState(new Date());
    // const [email, setEmail] = useState("");
    // const [schedule, setSchedule] = useState({});

    // Initialize the schedule
    // useEffect(() => {
    //     const initialScheduleObj = {};
    //     daysOfWeek.forEach((day) => {
    //         if (day === 'Sat' || day === 'Sun') {
    //             initialScheduleObj[`from${day}`] = 'unavailable';
    //             initialScheduleObj[`to${day}`] = 'unavailable';
    //         } else {
    //             initialScheduleObj[`from${day}`] = initialSchedule.from;
    //             initialScheduleObj[`to${day}`] = initialSchedule.to;
    //         }
    //     });
    //     setSchedule(initialScheduleObj);
    // }, []);


    // useEffect(() => {
    //     // console.log(user?.emailAddresses[0]?.emailAddress);
    //     if (user?.emailAddresses[0]?.emailAddress) setEmail(user.emailAddresses[0].emailAddress);
    // }, [user?.emailAddresses])

    // useEffect(() => {
    //     console.log(userId);
    //     console.log(user);
    // }, [])

    // useEffect(() => {
    //     console.log("Toggle");
    // }, [date])

    return (
        <div>
            <h1 className="font-extrabold text-4xl ml-10 mb-10">Availability</h1>

            {/* <div className="flex justify-center items-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-8"
                />
            </div> */}

        </div>
    )
}

// <div className="flex">
//     <div className="bg-gray-100 w-96">
//         <div className="w-4/5 m-auto pt-5 pb-5">

//             {
//                 Object.keys(schedule).length
//                 &&
//                 daysOfWeek.map((ele, idx) => {
//                     return (
//                         <Component
//                             key={ele}
//                             day={ele}
//                             setSchedule={setSchedule}
//                             from={schedule[`from${ele}`]}
//                             to={schedule[`to${ele}`]}
//                         />
//                     )
//                 })
//             }

//         </div>
//     </div>
// </div>
function Component(props) {
    const { from, to, setSchedule, day } = props;
    return (
        <div className="grid grid-cols-3 gap-2 items-center text-black  pb-2 pt-2 w-60 pl-10 pr-10 border-2 border-black m-3">
            <div>
                {day}
            </div>
            {
                from === "unavailable" ?
                    <span>
                        unavailable
                    </span>
                    :
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <input type="number" className="border border-black w-full text-center" value={from} />
                        <input type="number" className="border border-black w-full text-center" value={to} />
                    </div>
            }

        </div>
    )
}

