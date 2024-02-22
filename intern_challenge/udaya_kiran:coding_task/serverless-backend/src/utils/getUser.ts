import db from "../config/database";

import { userSchema } from "../../db/schema";

export default {
  async getUser() {
    const res = await db.select().from(userSchema);
    return res;
  },
};
