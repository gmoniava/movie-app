import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/movies";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const result = await searchMovies(urlParams);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
