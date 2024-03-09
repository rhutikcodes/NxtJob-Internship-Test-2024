"use client"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import { useClerk } from "@clerk/nextjs";

export default function page() {

    const { getToken, userId } = useAuth()
    const { signOut } = useClerk();
    const router = useRouter();

    useEffect(() => {
        async function handleLogin() {
            try {
                const token = await getToken()
                if (token === null) throw new Error("error occured");
                const resp = await fetch('http://localhost:8787/login', {
                    method: "POST",
                    body: JSON.stringify({
                        token
                    })
                })

                if (resp.ok) {
                    const data = await resp.json();
                    console.log(data);
                    if (data.success) {
                        console.log('onSucess')
                        router.push('/events')
                    } else {
                        console.log('nosuccess');
                        const redirectTo = data.redirect
                        signOut(() => router.push(`/${redirectTo}`))
                    }

                } else {
                    throw new Error("Something went wrong")
                }
            } catch (error) {

                signOut(() => router.push('/'))
            }
        }

        handleLogin();
    })

    console.log(userId);
    return (
        <div>authenticateAfterSignIn</div>
    )
}