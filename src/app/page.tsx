import React from "react";
import { PrismaClient, User, Challenge } from "@prisma/client";
import { prisma } from "@/lib/db/(root)/prisma";
import { createUser } from "@/lib/db/user";

export default function Page() {
  // (async () => {
  //   const data = await getMostRecentChallenge("clwe90jge00007uala1rjik7g");
  //   console.log(data);
  // })();

  return <div>Page</div>;
}
