import { db } from "./db";
import { Hono } from 'hono';

const app = new Hono()

app.get('/', async(c) => {
  try{
    const data= await db.query.users.findMany();

  return c.json({data});
  } catch (error) {
    return c.json({error});
  }
});

export default app
