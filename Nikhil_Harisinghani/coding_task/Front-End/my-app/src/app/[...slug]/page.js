"use client"
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from 'next/navigation'

export default function page({ params }) {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const a = useRef(false);
    const [adj, setAdj] = useState([]);
    const [loading, setLoading] = useState(0)

    useEffect(() => {

        if (a.current) {
            console.log(params.slug[0])
            fetch('https://back-end.nikhilharisinghani26.workers.dev/getAvailabilityOnADay', {
                method: "POST",
                body: JSON.stringify({
                    slug: params.slug[0],
                    date
                })
            }).then(async (data) => await data.json()).then((data) => {
                // setAdj(adj);
                console.log(data?.returnPayload)
                setAdj(data?.returnPayload)
            }).catch((err) => {
                console.log(err)
            })

        }

    }, [date])

    useEffect(() => {
        if (a.current === false) {
            a.current = true;
        } else {
            a.current = false;
        }
        return () => {
            a.current = false;
        }
    }, [])

    useEffect(() => {
        async function checkUserExists() {

            try {
                fetch('https://back-end.nikhilharisinghani26.workers.dev/userExist', {
                    body: JSON.stringify({
                        slug: params.slug[0]
                    }),
                    method: "POST"
                }).then(async (response) => {
                    return await response.json()
                }).then((data) => {
                    if (data.success) {
                        setLoading(1);
                    } else {
                        setLoading(-1);
                    }
                })
            } catch (error) {
                console.log(error)
            }

        }
        checkUserExists();
    }, [])

    let addSpaceForTimings = 0;

    if (adj.length) {
        addSpaceForTimings = 60
    } else {
        addSpaceForTimings = 80
    }

    return (
        <div>
            {
                loading === 0 ?
                    <>loading</>
                    :
                    loading === -1 ?
                        <>
                            <h1>
                                Error 404 Page Not Found
                            </h1>
                        </>
                        :
                        <>
                            <h1 className="font-extrabold text-4xl ml-10 mb-10">
                                Book A Call
                            </h1>

                            <div className="flex justify-center items-center">
                                <div className={`w-[${addSpaceForTimings}vw] h-[67vh] bg-white shadow-2xl p-9 rounded-lg z-2 flex flex-row`}>

                                    <div className="flex flex-col w-[22vw]">
                                        <h2 className="text-xl text-black-400/25">{params.slug[0]}</h2>
                                        <h1 className="text-3xl text-black-400/50">30 Min Meeting</h1>
                                        <h2 className="text-xl text-black-400/25">Select Date and Time</h2>
                                    </div>

                                    <div>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            className="rounded-md p-8"
                                        />
                                    </div>

                                    <div className="flex flex-col text-center flex-1 overflow-y-auto pr-2">
                                        {
                                            adj.map((ele, idx) =>
                                                <button className="border-double border-black border-2 w-[80px] mx-auto mb-2 p-2 pr-3 pl-3" key={idx}

                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                                        console.log(formattedDate);
                                                        console.log(e.currentTarget.innerHTML + ":00")
                                                        console.log(params.slug[0]);

                                                        router.push(`/form/${formattedDate}/${params.slug[0]}/${e.currentTarget.innerHTML}:00`);
                                                    }}>
                                                    {ele?.start}
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        </>
            }
        </div>
    )

}