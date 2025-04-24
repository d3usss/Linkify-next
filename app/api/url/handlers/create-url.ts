import { db } from "@/db/db";
import { urlsTable, users } from "@/db/schema";
import generateRandomString from "@/utils/generateRandomString";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { NextResponse } from "next/server";
import { returnServerError } from "@/utils/returnServerError";
import { getAuthSession } from "@/utils/getAuthSession";

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
      return NextResponse.json({ status: 401 }, { statusText: "Unauthorized" });
    }

    const { orginalUrl } = await request.json();
    const parsed = urlValidationSchema.safeParse({ orginalUrl });

    if (!parsed.success) {
      return NextResponse.json({ status: 400 }, { statusText: "Invalid URL" });
    }

    const isUrlExists = await db
      .select()
      .from(urlsTable)
      .where(sql`${urlsTable.orginalUrl} = ${orginalUrl}`)
      .get();

    if (isUrlExists) {
      return NextResponse.json(
        { status: 409 },
        { statusText: "URL already exists" }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${session.user?.email}`)
      .get();

    if (!user) {
      return NextResponse.json(
        { status: 404 },
        { statusText: "Not Found user" }
      );
    }

    const addedUrl = await db.insert(urlsTable).values({
      orginalUrl,
      shortUrl: generateRandomString(),
      userId: user.id,
    });

    if (!addedUrl) {
      return NextResponse.json(
        { status: 500 },
        { statusText: "Internal Server Error" }
      );
    }

    return NextResponse.json(
      { status: 200 },
      { statusText: "URL added successfully" }
    );
  } catch (error: unknown) {
    returnServerError(error);
  }
}
