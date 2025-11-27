import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata() {
  return { title: "Support | 30 Day Me" };
}

export default function ContactPage() {
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
              SUPPORT
            </span>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Support - 30 Day Me
            </h1>
            <div className="my-6 h-1 w-20 rounded-full bg-linear-to-r from-blue-600 to-purple-600"></div>
            <p className="text-sm text-gray-500">Last updated: November 26, 2025</p>
          </div>
        </div>
      </section>

      {/* Support Content Section */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-center">
            {/* Contact Info */}
            <div>
              <p className="text-lg leading-relaxed text-gray-600">
                If you need help with the app, contact us at:
              </p>
              <a
                href="mailto:franklinzhang06@gmail.com"
                className="mt-2 inline-block text-xl font-medium text-blue-600 hover:underline"
              >
                franklinzhang06@gmail.com
              </a>
              <p className="mt-4 text-gray-500">
                We typically respond within 1-3 business days.
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Useful links:
              </h2>
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
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