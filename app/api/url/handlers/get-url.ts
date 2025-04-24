import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { urlsTable, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { getAuthSession } from "@/utils/getAuthSession";
import { returnServerError } from "@/utils/returnServerError";
import { SuccessStatuses, ErrorStatuses } from "@/utils/statuses";
import { baseUrl } from "@/utils/getBaseUrl";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(ErrorStatuses.UNAUTHORIZED);
    }

    const user = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${session.user?.email}`)
      .get();

    if (!user) {
      return NextResponse.json(ErrorStatuses.USER_NOT_FOUND);
    }

    const urls = await db
      .select()
      .from(urlsTable)
      .where(sql`${urlsTable.userId} = ${user.id}`)
      .all();

    const data = urls.map((url, index) => ({
      id: index + 1,
      orginalUrl: url.orginalUrl,
      shortUrl: `${baseUrl}/url/${url.shortUrl}`,
      createdAt: url.createdAt.toLocaleString(),
    }));

    if (!data) {
      return NextResponse.json(ErrorStatuses.URL_NOT_FOUND);
    }

    return NextResponse.json(data, SuccessStatuses.SUCCESS);
  } catch (error: unknown) {
    returnServerError(error);
  }
}
