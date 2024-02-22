import { Context } from "hono";

export async function handleScheduleUpdate(e: Context) {
    const body: Array<{ from: string, till: string, day: string, isAvail: boolean }> = await e.req.json();
    return e.text("Hono");
}