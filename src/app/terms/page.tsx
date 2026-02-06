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
      <section className="w-full py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Please read these terms before using 30 Day Me.
          </p>

          <div className="border-border mt-12 border-t pt-12">
            <div className="prose max-w-none prose-headings:text-foreground prose-h1:hidden prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:text-base prose-h3:font-semibold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-hr:border-border prose-table:text-sm prose-thead:border-border prose-th:text-foreground prose-th:font-medium prose-td:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {termsContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-border w-full border-t py-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
