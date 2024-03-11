"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page({ params }) {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleOnSubmit = async () => {

        if (email.length === 0) {
            confirm('Enter email please')
            return;
        }

        const res = await fetch('https://back-end.nikhilharisinghani26.workers.dev/bookSlot', {
            method: "POST",
            body: JSON.stringify({
                payload: {
                    date: params.params[0],
                    startTime: decodeURIComponent(params.params[2]),
                    clientEmailId: email,
                    slug: params.params[1]
                }
            })
        })

        const payload = await res.json();
        if (payload.success) {
            confirm('Successful');
        } else {
            confirm('Something Went wrong');
        }
        //router.push(`/${params.params[1]}`);
    }

    return (
        <div className="flex justify-center items-center pt-[7vh]">

            <div
                className={`w-[35vw] h-[60vh] shadow-2xl p-9 rounded-lg z-2 flex flex-col  justify-center items-center`}>

                <div className='w-[80%]'>
                    <h1 className="text-3xl mb-2">
                        With:{params.params[1]}
                    </h1>
                </div>

                <div className="mt-[2vh] w-[80%]">
                    <h1 className="text-3xl mb-2">
                        On:{params.params[0]}
                    </h1>
                </div>

                <div className="mt-[2vh] w-[80%]">
                    <h1 className="text-3xl mb-2">
                        Time:{decodeURIComponent(params.params[2])}
                    </h1>
                </div>

                <div className="mt-[3vh] w-[80%]">
                    <h2>Enter Email</h2>
                    <input
                        className="h-[5vh] border-black border-2 w-[100%]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-[3vh] flex flex-row justify-between w-[80%]">
                    <button
                        className="border-double border-black border-2 mb-2 p-2 pr-2 pl-2 hover:bg-red-800"
                        onClick={() => { router.push(`/${params.params[1]}`) }}>
                        Cancel
                    </button>

                    <button
                        className="border-double border-black border-2 mb-2 p-2 pr-2 pl-2 hover:bg-green-800"
                        onClick={handleOnSubmit}>
                        Schedule
                    </button>
                </div>

            </div>

        </div>
    )
}
