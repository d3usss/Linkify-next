import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { urlsTable, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db
    .select()
    .from(users)
    .where(sql`${users.email} = ${session.user?.email}`)
    .get();

  if (!user) {
    return NextResponse.json({ status: 404 }, { statusText: "Not Found user" });
  }

  const urls = await db
    .select()
    .from(urlsTable)
    .where(sql`${urlsTable.userId} = ${user.id}`)
    .all();

  const data = urls.map((url, index) => ({
    id: index + 1,
    originalUrl: url.orginalUrl,
    shortUrl: url.shortUrl,
    createdAt: url.createdAt.toLocaleString(),
  }));

  if (!data) {
    return NextResponse.json(
      { status: 404 },
      { statusText: `No URLs found ${user.name}` }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
