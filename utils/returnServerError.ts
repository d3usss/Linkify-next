import { NextResponse } from "next/server";

export function returnServerError(error: unknown) {
  console.error("Error fetching URLs:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
