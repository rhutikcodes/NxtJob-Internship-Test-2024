import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(str);
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'drizzle'
        })
        console.log('migration successful');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main();