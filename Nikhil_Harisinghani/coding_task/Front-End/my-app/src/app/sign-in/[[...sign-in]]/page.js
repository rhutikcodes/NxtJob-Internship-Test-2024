"use client"
import { SignIn } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"

export default function page() {

    const { getToken } = useAuth;
    console.log(getToken);

    return (
        <>
            <div className="flex justify-center items-center">
                <SignIn />
            </div>
        </>
    )
}
