import AddUrlForm from "@/components/AddUrlForm";
import Grid from "@/components/Grid";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { baseUrl } from "@/utils/getBaseUrl";

export default async function Dashboard() {
  const session = await getServerSession();
  const data = await fetch(`${baseUrl}/api/url`, {
    method: "GET",
    headers: Object.fromEntries((await headers()).entries()),
  }).then((res) => res.json());

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="my-4">Welcome to your dashboard {session.user?.name}!</p>

      <AddUrlForm />
      <Grid data={data} />
    </>
  );
}
