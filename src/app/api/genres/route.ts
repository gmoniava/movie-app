import { NextResponse } from "next/server";
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function GET() {
  try {
    const result = await sql`SELECT id, name FROM genres ORDER BY id;`;

    const options = result.map((genre) => ({
      value: genre.id,
      label: genre.name,
    }));

    return NextResponse.json(options);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({ error: "Failed to load genres" }, { status: 500 });
  }
}
