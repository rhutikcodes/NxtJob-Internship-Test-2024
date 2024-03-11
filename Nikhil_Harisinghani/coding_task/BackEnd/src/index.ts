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
import { handleUserExistsUsingSlug } from "./controllers/handleUserExistsUsingSlug";
import { handleAvailabilityOfDay } from "./controllers/handleAvailabilityOfDay";

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/Calendly-Clone?sslmode=require"

const app = new Hono();
const sql = neon(str);

export const db = drizzle(sql);
app.use('/*', cors());

app.get('/', (c) => {
	return c.text("Hello World")
})

app.post('/register-user', handleOnUserRegister); // Integration done

app.post('/login', handleLogin) // Integration Done

app.put('/updateWeeklyschedule', handleWeeklyScheduleUpdate); //Integration Done

app.get('/getWeeklyschedule', handleGetWeeklySchedule); // Integration Done

app.post('/bookSlot', handleSlotBooking); // Integration Done and (Google API integration remains)

app.post('/', handleUpstashQueueMessage) // changes to be made

app.post('/userExist', handleUserExistsUsingSlug); // Integration Done

app.post('/getAvailabilityOnADay', handleAvailabilityOfDay); // Integration Done

app.notFound((c) => {
	return c.text("Not Found");
})

export default app;