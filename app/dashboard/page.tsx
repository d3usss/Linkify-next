import AddUrlForm from "@/components/AddUrlForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="my-4">Welcome to your dashboard {session.user?.name}!</p>
      <AddUrlForm />
    </>
  );
}
