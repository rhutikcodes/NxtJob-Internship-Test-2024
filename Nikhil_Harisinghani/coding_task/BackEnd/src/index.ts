import { Hono } from "hono";
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { handleOnUserRegister } from "./controllers/handleUserRegister";
import { handleLogin } from "./controllers/handleLogin";
import { handleWeeklyScheduleUpdate } from "./controllers/handleWeeklyScheduleUpdate";
import { handleGetWeeklySchedule } from "./controllers/handleGetWeeklySchedule";
import { handleSlotBooking } from "./controllers/handleSlotBooking";
import { handleUpstashQueueMessage } from "./controllers/handleOnIncomingQueueMesaage";

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/Calendly-Clone?sslmode=require"

const app = new Hono();
const sql = neon(str);

export const db = drizzle(sql);
app.use('/*', cors());

app.get('/', (c) => c.text("Hello World"))

app.post('/register-user', async (c) => await handleOnUserRegister(c)); // Integration done

app.post('/login', async (c) => await handleLogin(c)) // Integration Done

app.put('/updateWeeklyschedule', async (c) => await handleWeeklyScheduleUpdate(c)); //Integration Done

app.get('/getWeeklyschedule', async (ctx) => await handleGetWeeklySchedule(ctx)); // Integration Done

app.post('/bookSlot', async (c) => await handleSlotBooking(c));

app.post('/', async (ctx) => await handleUpstashQueueMessage(ctx)) // changes to be made


app.notFound((c) => {
	return c.text("Not Found");
})

export default app;