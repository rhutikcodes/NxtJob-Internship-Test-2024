import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connection = neon(
  "postgresql://gudaya2002:zHa0NUkg2ftQ@ep-twilight-mountain-a1dzwp7h.ap-southeast-1.aws.neon.tech/calendly-db?sslmode=require"
);
const db = drizzle(connection);

export default db;
