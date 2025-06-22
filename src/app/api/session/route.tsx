import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "@/lib/auth";

export async function GET() {
  try {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
      return NextResponse.json({ authenticated: false, session: null }, { status: 401 });
    }

    const verifiedSession = await verify(session);
    return NextResponse.json({ authenticated: true, session: verifiedSession }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
