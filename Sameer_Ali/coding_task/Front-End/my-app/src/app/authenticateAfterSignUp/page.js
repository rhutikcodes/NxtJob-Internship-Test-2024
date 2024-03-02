"use client"
import { useState } from "react"
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useClerk } from "@clerk/nextjs";

export default function page() {
    const [slug, setSlug] = useState('')
    const { getToken } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    const { signOut } = useClerk();
    const handleOnClickSubmit = async () => {

        const response = await fetch('http://localhost:8787/register-user', {

            body: JSON.stringify({
                slug: slug,
                token: await getToken(),
                email: user.emailAddresses[0].emailAddress
            }),

            method: "POST"
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data);
            router.push('/availability');
        } else {
            signOut(() => router.push('/home'))
        }
    }

    return (
        <div className="absolute w-[100vw] h-[100vh] backdrop-filter backdrop-blur-md top-0">
            <div className="mt-[70px] w-[60%] h-[40px] m-auto flex flex-row">

                <input
                    placeholder="Enter Slug (Should be Unique)"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="h-[100%] border-black border-2 flex-grow"
                >
                </input>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={handleOnClickSubmit}
                >
                    Submit
                </button>

                {/* <div>(Not Unique)</div> */}

            </div>
        </div>
    )

}
