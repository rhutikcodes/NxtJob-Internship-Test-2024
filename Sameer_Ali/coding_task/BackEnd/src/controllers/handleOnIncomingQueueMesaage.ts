import { Context } from "hono";
import { Resend } from 'resend';
import { Receiver } from '@upstash/qstash';
const resend = new Resend('re_fcxPRKcm_MEPjvA4V7iwCp2ik5na1wpcT');

// ##REQUIRED FOR SENDING
const QSTASH_URL = "https://qstash.upstash.io/v2/publish/"
const QSTASH_TOKEN = "eyJVc2VySUQiOiI1OTUxYjBkNy1iZjdkLTQ3MDYtOGExZC1kNzA4YmJkNjVjOGQiLCJQYXNzd29yZCI6Ijk5MzZjNGNhYWM3NzQxOTRiOThlNTkyZWUzYjQ2YTE2In0="

// ##REQUIRED FOR RECEIVING
const QSTASH_CURRENT_SIGNING_KEY = "sig_5bV9wPsyi6Ckd3f48W5tRijSTyX9"
const QSTASH_NEXT_SIGNING_KEY = "sig_7SEgDgTBxgasUy4tovds8mrCjqrY"

const c = new Receiver({
    currentSigningKey: QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: QSTASH_NEXT_SIGNING_KEY,
});

export async function handleOnIncomingQueueMessg(ctx: Context) {
    try {
        const signatureHeader = ctx.req.header('Upstash-Signature');
        await ctx.req.json().then((d) => console.log(d)).catch(e => console.log(e));
        const body: { from: string, to: string } = await ctx.req.json();
        console.log("I am in!");
        console.log(body);
        if (typeof (signatureHeader) === "string") {
            // Issue is gmail.com is not allowed
            // const isValid = await c.verify({
            // 	signature: signatureHeader,
            // 	body
            // })
            //console.log(isValid);
            //if (!isValid) throw new Error("Invalid")
            ctx.status(200);
            console.log(body);

            // 'onboarding@resend.dev'

            const result = await resend.emails.send({
                from: `onboarding@resend.dev`,
                to: `${body.to}`,
                subject: 'Hello World',
                html: '<strong>It works!</strong>',
            });

            // cannot sendfrom gmail.com domain 
            if (result.error) {
                console.error(result.error);
                throw new Error("Couldn`t")
            }

            console.log(result.data);

            return ctx.json({
                "message": "recieved"
            });
        } else {
            throw new Error();
        }
    } catch (error: any) {

        if (error.message === "Invalid") {
            ctx.status(200);
            return ctx.json({
                "message": "Invalid Credentials"
            })
        }

        ctx.status(500);
        return ctx.json({
            "message": "Internal Server Error"
        })
    }
}