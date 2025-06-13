import PwaDemo from "@/components/PwaDemo";

export default function PwaTestPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">PWA Test Page</h1>
        <p className="mb-6 text-gray-600">
          Test the Progressive Web App features including push notifications,
          installation prompts, and service worker functionality.
        </p>
      </div>
      <PwaDemo />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "PWA Test - 30 Day Challenge",
    description:
      "Test Progressive Web App features including push notifications and installation",
  };
}
