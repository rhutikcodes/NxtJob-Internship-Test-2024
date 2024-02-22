import type { Config } from 'drizzle-kit';
import { resolve } from 'node:path';

export default {
  driver: 'pg',
  out: './src/db',
  schema: './src/db/schema.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;