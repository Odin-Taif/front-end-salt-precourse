import { db } from "@/drizzle/dbschema/db";
import { users } from "@/drizzle/dbschema/schema";
import { eq, like } from "drizzle-orm";

// Function to fetch users by name query
export async function fetchUsers(query: string, currentPage: number) {
  try {
    // Fetch users where the name matches the query (partial match)
    const userList = await db
      .select()
      .from(users)
      .where(like(users.name, `%${query}%`)) // Using "like" for partial matches
      .execute();

    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
