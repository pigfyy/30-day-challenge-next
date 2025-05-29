import { db, prodDb } from "@/lib/db/drizzle";
import { validateAdmin } from "@/lib/util";
import { SurveyAnalyticsDashboard } from "./(components)/SurveyAnalyticsDashboard";

export default async function Survey30DayGenAdminPage() {
  await validateAdmin();

  const responses = await db.query.surveyResponse.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <SurveyAnalyticsDashboard responses={responses} />
    </div>
  );
}
