import { Hono } from "hono";
import { cors } from 'hono/cors';
import { firstlogin, userAvailability } from './db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from "drizzle-orm";
import { Client } from "@upstash/qstash/.";
import { Receiver } from '@upstash/qstash';
import { Resend } from 'resend';
import { checkAndUpdateAvailability } from "./utils/handleAvailabilityOnLogin";

const resend = new Resend('re_fcxPRKcm_MEPjvA4V7iwCp2ik5na1wpcT');

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/finalintern?sslmode=require";

const app = new Hono();
const sql = neon(str);

// ##REQUIRED FOR SENDING
const QSTASH_URL = "https://qstash.upstash.io/v2/publish/"
const QSTASH_TOKEN = "eyJVc2VySUQiOiI1OTUxYjBkNy1iZjdkLTQ3MDYtOGExZC1kNzA4YmJkNjVjOGQiLCJQYXNzd29yZCI6Ijk5MzZjNGNhYWM3NzQxOTRiOThlNTkyZWUzYjQ2YTE2In0="

// ##REQUIRED FOR RECEIVING
const QSTASH_CURRENT_SIGNING_KEY = "sig_5bV9wPsyi6Ckd3f48W5tRijSTyX9"
const QSTASH_NEXT_SIGNING_KEY = "sig_7SEgDgTBxgasUy4tovds8mrCjqrY"

export const db = drizzle(sql);

const c = new Receiver({
	currentSigningKey: QSTASH_CURRENT_SIGNING_KEY,
	nextSigningKey: QSTASH_NEXT_SIGNING_KEY,
});

app.get('*', cors());
app.post('*', cors());

app.get('/', async (c) => {
	try {
		return c.text('Hello World!')
	} catch (error) {
		return c.text("Error")
	}
})

// working fine
app.get('/login', async (c) => {
	try {
		const { email }: { email: string } = await c.req.json();
		console.log(email);

		const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));
		console.log(cheq);
		c.status(200);

		if (cheq.length) {
			const res = await checkAndUpdateAvailability(email);
			return c.json({
				"message": "Successfully checked user has visited before",
				"success": true,
				data: res
			});
		}
		else return c.json({
			"message": "Successfully checked user has not visited before",
			"redirect": true
		});

	} catch (error) {
		c.status(500);
		return c.json({ "message": "Internal Error try again after some time" });
	}

})

// working fine
app.get('/register-user', async (c) => {
	try {
		const { email, slugName }: { email: string, slugName: string } = await c.req.json();

		const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));

		if (cheq.length > 0) return c.json({ "message": "User already exists", "redirect": true });
		await db.insert(firstlogin).values({ email: email, slug: slugName });

		c.status(200);
		let currentDate = new Date();
		const date = currentDate.toISOString().split('T')[0];
		await db.insert(userAvailability).values({ email: email, avail: date, isAvail: true })
		return c.json({
			"message": "User registered succesfully"
		})
	} catch (error) {
		c.status(500);
		return c.json({ "message": "Internal Error try again after some time" });
	}
})

// error -> dont know how to authenticate gmail.com
app.get('/schedule-mail', async (c) => {
	// delay calculation logic at bottom DelayClaculation
	try {
		const body: { to: string } = await c.req.json();
		const client = new Client({
			token: `${QSTASH_TOKEN}`,
		});

		const res = await client.publishJSON({
			url: `https://4bfa-103-25-169-39.ngrok-free.app`,
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
});

app.post('/', async (ctx) => {

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

})

// // ##### TODO #####

// ## Refactoring wise
/*
	  1. shift function in a file named route
*/

// ## Functionality
/*
	1. Calculate Delay
	2. Update Availability On userCreation or login (i.e take current date check if there is a record if not initialize it )
	3. Implement Notification System (use queue only)
	4. check availability of both parties and add booking for both parties
*/

export default app;

/*
DelayClaculation
const currentDate = new Date();
const targetDate = new Date('(Date)T(Time)');-> T in between is necesaary
const timeDifferenceInSeconds = Math.floor((targetDate - currentDate) / 1000);->ans
*/