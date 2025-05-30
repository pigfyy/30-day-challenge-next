import { db, prodDb } from "@/lib/db/drizzle";
import { validateAdmin } from "@/lib/util";
import { SurveyAnalyticsDashboard } from "./(components)/SurveyAnalyticsDashboard";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Survey Analysis - 30 Day Me",
  description: "Survey Analysis - 30 Day Me",
};

export default async function Survey30DayGenAdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if ((await searchParams).secret !== process.env.ADMIN_SECRET) {
    await validateAdmin();
  }

  const isDevelopment = process.env.NODE_ENV === "development";
  const hasProdDb = !!process.env.POSTGRES_URL_PRODUCTION;
  const dbToUse = isDevelopment && hasProdDb ? prodDb : db;

  const responses = await dbToUse.query.surveyResponse.findMany({
    where: (surveyResponse, { eq }) => eq(surveyResponse.isInvalid, false),
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <SurveyAnalyticsDashboard responses={responses} />
    </div>
  );
}
