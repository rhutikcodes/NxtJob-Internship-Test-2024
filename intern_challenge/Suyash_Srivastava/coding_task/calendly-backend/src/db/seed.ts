import { users } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema: { users } });

const main = async () => {
    try {
        console.log("Seeding Database");
        
        await db.delete(users);

        await db.insert(users).values([
            { 
              id: 1, 
              name: "John Doe",
              email: "doe.john@example.com",
            },
            { 
              id: 2, 
              name: "Alan Doe",
              email: "doe.alan@example.com",
            },
            { 
              id: 3, 
              name: "Alice Doe",
              email: "doe.alice@example.com",
            },
        ]);       
    } catch (error) {
      console.error(error);
      throw new Error("Failed to seed database");
    }
  };

  main();