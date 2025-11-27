import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata() {
  return { title: "Contact Us | 30 Day Me" };
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
              GET IN TOUCH
            </span>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Contact Us
            </h1>
            <div className="my-6 h-1 w-20 rounded-full bg-linear-to-r from-blue-600 to-purple-600"></div>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-gray-600">
              Have questions, feedback, or need support? We&apos;d love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full bg-green-50 py-16">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-yellow-300 opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-60 w-60 rounded-full bg-blue-300 opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tell us more about your question or feedback..."
                  required
                />
              </div>
              <div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full transform bg-blue-600 text-lg font-semibold shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
                >
                  Send Message
                </Button>
              </div>
            </form>
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
