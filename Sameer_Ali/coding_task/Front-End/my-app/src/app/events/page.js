"use client"
import { useState } from "react";

export default function page() {
    const [email, setEmail] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div>Events</div>
        </div>
    )
}

{/* <form className="w-60 rounded-md border border-black p-4">
    <div>
        <label>Invite</label>
        <input type="email" placeholder="Invite" className="border border-black" />
    </div>
    <div>
        <label>From</label>
        <input type="number" placeholder="From" className="border border-black" />
    </div>
    <div>
        <label>To</label>
        <input type="number" placeholder="To" className="border border-black" />
    </div>
    <button className="mt-2 bg-black text-white p-1 rounded-md" onClick={(e) => handOnSubmit(e)}>Create</button>
</form> */}