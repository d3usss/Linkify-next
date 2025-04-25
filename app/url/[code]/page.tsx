import { db } from "@/db/db";
import { urlsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

interface UrlProps {
  params: Promise<{ code: string }>;
}

export default async function Url({ params }: UrlProps) {
  const { code } = await params;
  const url = await db
    .select()
    .from(urlsTable)
    .where(sql`${urlsTable.code} = ${code}`)
    .get();

  if (!url || !url.orginalUrl) {
    redirect("/404");
  }

  redirect(url.orginalUrl);
}
