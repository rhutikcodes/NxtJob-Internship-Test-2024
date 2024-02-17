"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const initialSchedule = {
    from: 9,
    to: 5,
};

export default function page() {
    const { user } = useUser();
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [schedule, setSchedule] = useState({});

    // Initialize the schedule
    useEffect(() => {
        const initialScheduleObj = {};
        daysOfWeek.forEach((day) => {
            if (day === 'Sat' || day === 'Sun') {
                initialScheduleObj[`from${day}`] = 'unavailable';
                initialScheduleObj[`to${day}`] = 'unavailable';
            } else {
                initialScheduleObj[`from${day}`] = initialSchedule.from;
                initialScheduleObj[`to${day}`] = initialSchedule.to;
            }
        });
        setSchedule(initialScheduleObj);
        // console.log(initialScheduleObj);
    }, []);


    useEffect(() => {
        // console.log(user?.emailAddresses[0]?.emailAddress);
        if (user?.emailAddresses[0]?.emailAddress) setEmail(user.emailAddresses[0].emailAddress);
    }, [user?.emailAddresses])

    return (
        <div className="flex">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-80 mr-40"
            />
            <div>
                {
                    Object.keys(schedule).length
                    &&
                    daysOfWeek.map((ele, idx) => {
                        return (
                            <Component
                                key={ele}
                                day={ele}
                                setSchedule={setSchedule}
                                from={schedule[`from${ele}`]}
                                to={schedule[`to${ele}`]}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

function Component(props) {
    const { from, to, setSchedule, day } = props;
    return (
        <div className="grid grid-cols-3 gap-2 items-center text-black  pb-2 pt-2 w-60">
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
                        <input type="number" className="border border-black w-full" value={from} />
                        <input type="number" className="border border-black w-full" value={to} />
                    </div>
            }

        </div>
    )
}

//console.log(props);