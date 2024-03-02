"use client"
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@clerk/nextjs";

export default function page({ params }) {
    const { getToken } = useAuth()
    const [date, setDate] = useState(new Date());
    const a = useRef(false);
    const [adj, setAdj] = useState([]);
    getToken().then((data) => {
        console.log(data)
    })
    useEffect(() => {

        if (a.current) {
            setAdj((prev) => {
                return [...adj, adj.length + 1]
            })
        }
        // make an api call to getch info on that day
    }, [date])

    useEffect(() => {

        if (a.current) {
            a.current = false
        } else {
            a.current = true;
        }

        return () => {
            a.current = false;
        }

    }, [])

    useEffect(() => {
        // async function checkUserExists() {

        //     await fetch('http://localhost:8787', {
        //         headers: {

        //         },
        //         body: {
        //             slug: params.slug
        //         }
        //     })
        // }

        // checkUserExists(); 
        // use this to fetch availabilities if user does not exists redirect to 404 
    }, [])

    let addSpaceForTimings = 0;
    if (adj.length) {
        addSpaceForTimings = 60
    } else {
        addSpaceForTimings = 70
    }

    return (
        <div>

            <h1 className="font-extrabold text-4xl ml-10 mb-10">
                Book A Call For {params.slug[0]}
            </h1>

            <div className="flex justify-center items-center">
                <div className={`w-[${addSpaceForTimings}vw] h-[67vh] bg-white shadow-2xl p-9 rounded-lg z-2 flex flex-row`}>

                    <div className="flex flex-col w-[22vw]">
                        <h2 className="text-xl text-black-400/25">Add Name Here...</h2>
                        <h1 className="text-3xl text-black-400/50">30 Min Meeting</h1>
                    </div>

                    <div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md p-8"
                        />
                    </div>

                    <div className="flex flex-col text-center flex-1 overflow-auto">
                        {/* Beautify the button Please */}
                        {
                            adj.map((ele) =>
                                <button className="bg-indigo-400 w-[75%] mx-auto mb-2 ">{ele}</button>)
                        }
                    </div>

                </div>
            </div>

        </div>
    )

}



// things on my mind to make it responsive