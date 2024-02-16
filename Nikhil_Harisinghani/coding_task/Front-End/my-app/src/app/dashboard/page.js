"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react";
export default function page() {
    const { user } = useUser()
    useEffect(() => {
        console.log(user?.emailAddresses[0]?.emailAddress);
    }, [user?.emailAddresses])

    return (
        <div>page</div>
    )
}
