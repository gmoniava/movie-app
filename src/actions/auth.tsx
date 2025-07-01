"use server";

import { cookies } from "next/headers";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sign, verify } from "@/lib/auth";
import { z } from "zod";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

async function getUser(email: string): Promise<any> {
  const user = await sql`SELECT * FROM users WHERE email=${email}`;
  return user[0];
}
export async function logout() {
  (await cookies()).delete("session");
}

export async function login(previousState: any, formData: FormData) {
  try {
    // Parse the user from the request
    const user = UserSchema.parse({ email: formData.get("email") || "", password: formData.get("password") || "" });

    // Find user in the database
    const userFromDb = await getUser(user.email);
    if (!userFromDb) {
      return {
        error: "User not found",
        data: {
          pwd: user.password,
          email: user.email,
        },
      };
    }

    // Do the passwords match?
    const passWordsMatch = bcrypt.compareSync(user.password, userFromDb.password);
    if (!passWordsMatch)
      return {
        error: "Wrong credentials",
        data: {
          pwd: user.password,
          email: user.email,
        },
      };

    // We authenticated the user, now let's create a session.
    // The session will exist for 1 hour.
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await sign({ user, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });

    return {
      data: {
        pwd: user.password,
        email: user.email,
      },
    };
  } catch (err: any) {
    console.error("Authentication failed:", err);
    return {
      error: "Something went wrong. Please try again.",
      data: {
        email: formData.get("email") || "",
        pwd: formData.get("password") || "",
      },
    };
  }
}
