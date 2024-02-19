import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { firstlogin } from './db/schema'
import { eq } from "drizzle-orm";

const app = new Hono();

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(str);
const db = drizzle(sql);

app.get('/', async (c) => {
	const r = await c.req.json();
	console.log(r);
	console.log(c.req.query());
	return c.text("hello world");
});

app.get('/first-login', async (c) => {
	const { email }: { email: string } = await c.req.json();
	console.log(email);

	if (typeof (email) === "undefined") {
		c.status(201);
		return c.text("email is undefined");
	}

	try {
		const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));
		console.log(cheq);
		c.status(200);
		return c.text("Successfully checked user has visited before");
	} catch (error) {
		c.status(500);
		return c.text("Internal Error try again after some time");
	}

})

app.get('/register-user', async (c) => {
	const { email, slugName }: { email: string, slugName: string } = await c.req.json();

	console.log(email);
	console.log(slugName);

	if (typeof (email) === "undefined" || typeof (slugName) === "undefined") {
		c.status(400);
		return c.text("email or slug is undefined");
	}

	try {
		const cheq = await db.select().from(firstlogin).where(eq(firstlogin.email, email));
		// console.log(cheq);
		if (cheq.length > 0) return c.text("User already exists");
		await db.insert(firstlogin).values({ email: email, slug: slugName });
	} catch (e) {
		c.status(500);
		return c.text("Internal Error try again after some time");
	}
	return c.text("Awesome")
})


export default app;

// import { migrate } from 'drizzle-orm/neon-http/migrator';

// await db.insert(products).values({ name: 'NH67', description: 'second Insertion', price: 99 })
// console.log('data inserted');