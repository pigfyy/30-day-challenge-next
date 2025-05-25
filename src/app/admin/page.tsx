import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ADMIN_IDS } from "@/lib/constants";
import { Leaderboard } from "@/components/organism/Leaderboard";

async function validateAdmin() {
  const { userId } = await auth();
  if (!userId || !ADMIN_IDS.includes(userId)) {
    redirect("/");
  }
}

export default async function Admin() {
  await validateAdmin();

  return (
    <div className="flex flex-1 items-center justify-center">
      <Leaderboard />
    </div>
  );
}
