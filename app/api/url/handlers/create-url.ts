import { db } from "@/db/db";
import { urlsTable, users } from "@/db/schema";
import generateRandomString from "@/utils/generateRandomString";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { NextResponse } from "next/server";
import { returnServerError } from "@/utils/returnServerError";
import { getAuthSession } from "@/utils/getAuthSession";
import { ErrorStatuses, SuccessStatuses } from "@/utils/statuses";

const urlValidationSchema = z.object({
  orginalUrl: z
    .string()
    .url({ message: "Invalid url" })
    .refine((val) => val.startsWith("https://"), {
      message: "URL need start with https://",
    })
    .refine((val) => /\.\w{2,}$/.test(val), {
      message: "URL need domain ending (example: .pl, .com)",
    }),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(ErrorStatuses.UNAUTHORIZED);
    }

    const { orginalUrl } = await request.json();
    const parsed = urlValidationSchema.safeParse({ orginalUrl });

    if (!parsed.success) {
      return NextResponse.json(ErrorStatuses.INVALID_URL);
    }

    const isUrlExists = await db
      .select()
      .from(urlsTable)
      .where(sql`${urlsTable.orginalUrl} = ${orginalUrl}`)
      .get();

    if (isUrlExists) {
      return NextResponse.json(ErrorStatuses.URL_ALREADY_EXISTS);
    }

    const user = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${session.user?.email}`)
      .get();

    if (!user) {
      return NextResponse.json(ErrorStatuses.USER_NOT_FOUND);
    }

    const addedUrl = await db.insert(urlsTable).values({
      orginalUrl,
      code: generateRandomString(),
      userId: user.id,
    });

    if (!addedUrl) {
      return NextResponse.json(ErrorStatuses.URL_CREATION_FAILED);
    }

    return NextResponse.json(SuccessStatuses.SUCCESS);
  } catch (error: unknown) {
    returnServerError(error);
  }
}
