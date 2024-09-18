import { db } from "@/drizzle/dbschema/db";
import { users } from "@/drizzle/dbschema/schema";

export async function fetchUsers() {
  try {
    const userList = await db.select().from(users).execute();
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
