import { PrismaClient } from "@/lib/db/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: "minimal",
    datasources: {
      db: {
        url: process.env.POSTGRES_PRISMA_URL,
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Handle potential initialization errors
prisma.$connect().catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
