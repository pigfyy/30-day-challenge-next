import { db, prodDb } from "@/lib/db/drizzle";
import { validateAdmin } from "@/lib/util";
import { SurveyAnalyticsDashboard } from "./(components)/SurveyAnalyticsDashboard";

export default async function Survey30DayGenAdminPage() {
  await validateAdmin();

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
