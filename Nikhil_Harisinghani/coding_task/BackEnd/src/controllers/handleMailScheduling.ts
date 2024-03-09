// handled
import { Client } from "@upstash/qstash/.";
import { Resend } from 'resend';

const QSTASH_TOKEN = "eyJVc2VySUQiOiI1OTUxYjBkNy1iZjdkLTQ3MDYtOGExZC1kNzA4YmJkNjVjOGQiLCJQYXNzd29yZCI6Ijk5MzZjNGNhYWM3NzQxOTRiOThlNTkyZWUzYjQ2YTE2In0="

const resend = new Resend('re_fcxPRKcm_MEPjvA4V7iwCp2ik5na1wpcT');

async function sendEmail(subject: string, message: string, to: string) {

    const result = await resend.emails.send({
        from: `onboarding@resend.dev`,
        to,
        subject,
        html: `<strong>${message}</strong>`,
    });
    console.log(result);
}

export async function handleMailScheduling(userEmail: string, clientEmailId: string, date: string, time: string): Promise<boolean> {
    try {

        const client = new Client({
            token: `${QSTASH_TOKEN}`,
        });
        console.log(userEmail);
        console.log(clientEmailId);
        await sendEmail('Meeting Scheduled', '.........', userEmail);
        await sendEmail('Meeting Scheduled', '.........', clientEmailId);

        const date1: any = new Date();
        const date2: any = new Date(`${date}T${time}`);

        const timeDifference = date2 - date1;

        const secondsDifference = Math.floor(timeDifference / 1000) - (15 * 60);

        const res1 = await client.publishJSON({
            url: `https://back-end.nikhilharisinghani26.workers.dev`,
            body: {
                to: userEmail
            }, delay: Math.max(secondsDifference, 0)
        });

        const res2 = await client.publishJSON({
            url: `https://back-end.nikhilharisinghani26.workers.dev`,
            body: {
                to: clientEmailId
            }, delay: Math.max(secondsDifference, 0)
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}