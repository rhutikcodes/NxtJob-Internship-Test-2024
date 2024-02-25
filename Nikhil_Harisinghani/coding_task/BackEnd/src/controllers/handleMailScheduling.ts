import { Context } from "hono";
import { Client } from "@upstash/qstash/.";
const QSTASH_TOKEN = "eyJVc2VySUQiOiI1OTUxYjBkNy1iZjdkLTQ3MDYtOGExZC1kNzA4YmJkNjVjOGQiLCJQYXNzd29yZCI6Ijk5MzZjNGNhYWM3NzQxOTRiOThlNTkyZWUzYjQ2YTE2In0="

export async function handleMailScheduling(c: Context) {
    // delay calculation logic at bottom DelayClaculation
    try {
        const body: { to: string } = await c.req.json();
        const client = new Client({
            token: `${QSTASH_TOKEN}`,
        });

        const res = await client.publishJSON({
            url: `https://a861-103-25-169-39.ngrok-free.app `,
            body: {
                hello: "world",
                to: body.to
            },
        });

        console.log(res);
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            "message": error
        })
    }

    return c.json({
        "message": "Queued succesfully"
    })
}