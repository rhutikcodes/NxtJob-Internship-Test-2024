"use client"
import { useState } from "react"
const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const btnClass = {
    backgroundColor: "#f00",
    borderColor: "#d00",
    borderRadius: "5px",
    padding: "5px 10px",
};

export default function page() {

    const [availability, setAvailability] = useState({
        'MON': ["00:00", "17:00", true],
        'TUE': ["01:00", "17:00", true],
        'WED': ["02:00", "17:00", true],
        'THU': ["03:00", "17:00", true],
        'FRI': ["04:00", "17:00", true],
        'SAT': ["05:00", "17:00", false],
        'SUN': ["06:00", "17:00", false]
    })

    function handleAvailabilityUpdate(day, updateIdx, value) {
        const updateFunction = (prevState) => ({
            ...prevState,
            [day]: [
                updateIdx === 0 ? value : prevState[day][0],
                updateIdx === 1 ? value : prevState[day][1],
                updateIdx === 2 ? !prevState[day][2] : prevState[day][2]
            ],
        });

        setAvailability(updateFunction);
    }

    // useEffect -> fetch

    return (
        <div className='w-[75vw] h-[74vh] m-auto mt-[10vh] rounded-xl shadow-xl flex flex-row p-8'>

            <div className='w-[50%] border-r border-black border-r-1 flex flex-col'>
                <h1 className='text-2xl font-bold pt-7'>
                    Weekly Hours
                </h1>

                <div className='grow mt-10'>
                    {
                        daysofWeek.map((day) => {
                            return (
                                <Comp day={day}
                                    dayAvailability={availability[day]}
                                    handleAvailabilityUpdate={handleAvailabilityUpdate}
                                />)
                        })
                    }
                </div>

                <div>
                    <button style={btnClass}> Update </button>
                </div>
            </div>

            <div className='w-[50%] pl-8'>

                <h1 className='text-2xl font-bold pt-7'>
                    Date-specific hours
                </h1>

                <div className="mt-[2vh] text-gray-500">
                    Override your availability for specific dates when your hours differ from your regular weekly hours.
                </div>

                <div className="mt-[1vh] rounded-xl border border-gray-800 w-[40%] pl-[10px] pr-[8px] text-sm pt-[2px] pb-[2px] cursor-pointer">
                    Add Date Specific Hours
                </div>
            </div>

        </div>
    )
}

function Comp({ day, dayAvailability, handleAvailabilityUpdate }) {

    return (
        <div className='flex flex-row items-center mb-5'>

            <input type="checkbox"
                class="appearance-none w-4 h-4 border border-gray-300 rounded-md bg-white checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onChange={() => { handleAvailabilityUpdate(day, 2) }}
                {...(dayAvailability[2] && { checked: true })}
            />


            <h1 className='text-2xl font-bold ml-6 w-[50px]'>
                {day}
            </h1>

            {
                dayAvailability[2] ?
                    <>
                        <div className="pl-[3vw] pr-[0.5vw]">
                            <input type='time' className='border border-gray-800 w-[8vw] rounded-md'
                                value={dayAvailability[0]}
                                onChange={(e) => { handleAvailabilityUpdate(day, 0, e.target.value) }}
                            />
                        </div>
                        -
                        <div className="pl-[0.5vw]">
                            <input type='time' className='border border-gray-800 w-[8vw] rounded-md'
                                value={dayAvailability[1]}
                                onChange={(e) => { handleAvailabilityUpdate(day, 1, e.target.value) }}
                            />
                        </div>
                    </>
                    :
                    <div className="pl-[3vw]">
                        <h1 className='text-xl font-bold text-gray-500'>
                            Unavailable
                        </h1>
                    </div>
            }

        </div>
    )
}