import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
	schema,
});