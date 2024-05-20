import React from "react";
import { PrismaClient, User, Challenge } from "@prisma/client";
import { prisma } from "../lib/prisma/(root)/prisma";
import { createUser } from "@/lib/prisma/user";

export default function Page() {
  // (async () => {
  //   const userInformation: User = {
  //     id: "cjld2cjxh0000qzrmn831i7rn",
  //     email: "franklinzhang06@gmail.com",
  //     username: "pigfy",
  //     imageUrl: "some-url.com",
  //     clerkId: "some-id",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };

  //   const data = await createUser(userInformation);
  //   console.log(data);
  // })();

  return <div>Page</div>;
}
