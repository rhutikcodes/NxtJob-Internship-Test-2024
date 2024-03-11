import { Context } from "hono";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function handleUserExistsUsingSlug(ctx: Context) {
    try {
        const { slug }: { slug: string } = await ctx.req.json();
        const usersExists = await db.select().from(users).where(eq(users.slug, slug))
        if (usersExists.length)
            return ctx.json({
                "message": "User Exists",
                "success": true
            })

        return ctx.json({
            "message": "User doesn't Exists",
            "success": false
        })

    } catch (error) {

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }
}