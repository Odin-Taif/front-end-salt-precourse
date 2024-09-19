import { db } from "@/drizzle/dbschema/db";
import { users } from "@/drizzle/dbschema/schema";

export async function fetchUsers() {
  try {
    // We artificially delay a response for demo purposes.

    // Try it if u want to see how suspence is working.
    // console.log("Fetching revenue data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log("Data fetch completed after 3 seconds.");
    const userList = await db.select().from(users).execute();
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
