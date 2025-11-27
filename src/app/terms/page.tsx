import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";

export async function generateMetadata() {
  return { title: "Terms of Service | 30 Day Me" };
}

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "src/content/terms-of-service.md");
  const termsContent = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      {/* Header Section */}
      <section className="from-background-darker to-background w-full bg-linear-to-br py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-80 w-80 rounded-full bg-blue-100/20 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center text-center">
            <span className="mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              LEGAL
            </span>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Terms of Service
            </h1>
            <div className="my-6 h-1 w-20 rounded-full bg-linear-to-r from-blue-600 to-purple-600"></div>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-gray-600">
              Please read these terms carefully before using 30 Day Me.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-h1:hidden prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h3:text-xl prose-p:leading-relaxed prose-li:marker:text-blue-600 prose-strong:text-gray-900">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {termsContent}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="w-full py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="transform transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
