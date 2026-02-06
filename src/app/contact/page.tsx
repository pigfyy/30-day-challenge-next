import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata() {
  return { title: "Contact | 30 Day Me" };
}

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      <section className="w-full py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
            Contact
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Need help with the app? Reach out.
          </p>
        </div>
      </section>

      <section className="border-border bg-muted w-full border-t py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground">
            Send us an email and we&apos;ll get back to you within 1-3 business
            days.
          </p>
          <a
            href="mailto:franklinzhang06@gmail.com"
            className="text-foreground mt-3 inline-block font-semibold underline"
          >
            franklinzhang06@gmail.com
          </a>

          <div className="border-border mt-12 border-t pt-12">
            <p className="text-foreground font-semibold">Useful links</p>
            <div className="text-muted-foreground mt-4 flex justify-center gap-6 text-sm">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-border w-full border-t py-8">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
