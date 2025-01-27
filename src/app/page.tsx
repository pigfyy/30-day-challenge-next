import { prisma } from "@/lib/db/(root)/prisma";
import { getChallenges } from "@/lib/db/challenge";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();

  return <div>Page</div>;
};

export default Page;
