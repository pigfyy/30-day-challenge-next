import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, prodDb } from "@/lib/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "30 Day Me",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
      allowDifferentEmails: true,
    },
  },
  user: {
    additionalFields: {
      completedDays: {
        type: "number",
        defaultValue: 0,
      },
      completedDaysInLast30Days: {
        type: "number",
        defaultValue: 0,
      },
    },
  },
  plugins: [username(), nextCookies()],
});

export const authProd = betterAuth({
  appName: "30 Day Me",
  database: drizzleAdapter(prodDb, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
      allowDifferentEmails: true,
    },
  },
  user: {
    additionalFields: {
      completedDays: {
        type: "number",
        defaultValue: 0,
      },
      completedDaysInLast30Days: {
        type: "number",
        defaultValue: 0,
      },
    },
  },
  plugins: [username(), nextCookies()],
});
