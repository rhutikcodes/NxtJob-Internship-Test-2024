import { Hono } from "hono";
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { handleScheduleUpdate } from "./controllers/handleScheduleUpdate";
import { handleSlotBooking } from "./controllers/handleSlotBooking";
import { handleOnUserRegister } from "./controllers/handleUserRegister";
import { handleMailScheduling } from "./controllers/handleMailScheduling";
import { handleOnIncomingQueueMessg } from "./controllers/handleOnIncomingQueueMesaage";
import { handleGetSchedule } from "./controllers/handleGetSchedule";
import { handleGetMeetings } from "./controllers/handleGetMeetings";
import { handleLogin } from "./controllers/handleLogin";

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/Project?sslmode=require"

const app = new Hono();
const sql = neon(str);

export const db = drizzle(sql);
app.use('/*', cors());

app.post('/login', async (c) => await handleLogin(c))

app.post('/register-user', async (c) => await handleOnUserRegister(c))

app.put('/update-schedule', async (c) => await handleScheduleUpdate(c))

app.post('/book-slot', async (c) => await handleSlotBooking(c));
// error -> dont know how to authenticate gmail.com
app.post('/schedule-mail', async (c) => await handleMailScheduling(c));
// recieves message from queue 
app.post('/', async (ctx) => await handleOnIncomingQueueMessg(ctx))

app.get('/get-schedule', async (ctx) => await handleGetSchedule(ctx));

app.get('/get-meetings', async (ctx) => await handleGetMeetings(ctx))

app.notFound((c) => {
	return c.text("Not Found");
})
export default app;


// // ##### TODO #####
// ## Functionality
/*
	1. Calculate Delay -> done look up DelayClaculation
	2. Update Availability On userCreation or login (i.e take current date check if there is a record if not initialize it ) 
	3. Implement Notification System (use queue only) -> research
	4. check availability of both parties and add booking for both parties -> done (to be checked)
*/


/*
DelayClaculation
const currentDate = new Date();
const targetDate = new Date('(Date)T(Time)');-> T in between is necesaary
const timeDifferenceInSeconds = Math.floor((targetDate - currentDate) / 1000);->ans
*/