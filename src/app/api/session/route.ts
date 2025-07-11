import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, session: null }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, session: session }, { status: 200 });
}
