import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import LearnMoreButton from "@/components/LearnMoreButton";
import PwaRedirectHandler from "@/components/PwaRedirectHandler";

export async function generateMetadata() {
  return "30 Day Me";
}

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      <PwaRedirectHandler />
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-grid-slate-400/[0.05] absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[40rem] w-[40rem] rounded-full bg-blue-100/20 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="animate-bounce-slow">
              <Image
                src="/logo.png"
                alt="30 Day Me Logo"
                width={100}
                height={100}
                className="rounded-xl shadow-lg"
              />
            </div>
            <h1 className="mt-8 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              30 Day Me
            </h1>
            <div className="my-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-gray-600">
              Track your habits, build your discipline, and build a new you
              month by month.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <SignInButton forceRedirectUrl={"/app"}>
                <Button
                  size="lg"
                  className="transform bg-blue-600 text-lg font-semibold shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
                >
                  Get Started
                </Button>
              </SignInButton>
              <LearnMoreButton />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full overflow-hidden py-24">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-yellow-300 opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-60 w-60 rounded-full bg-blue-300 opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              FEATURES
            </span>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Build Better Habits
            </h2>
            <div className="mb-12 h-1 w-16 rounded-full bg-blue-600"></div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex transform flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="rounded-full bg-blue-100 p-4 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-600"
                >
                  <path d="M11 18a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1z" />
                  <path d="M14 14a1 1 0 0 1 2 0a1 1 0 0 1-2 0a1 1 0 0 1 0 0z" />
                  <path d="M7 14a1 1 0 0 1 2 0a1 1 0 0 1-2 0a1 1 0 0 1 0 0z" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Challenge Search System
              </h3>
              <div className="my-4 h-0.5 w-10 rounded-full bg-blue-600"></div>
              <p className="mt-2 text-center text-gray-600">
                Find the perfect challenge to match your goals with our curated
                search system for inspiration.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex transform flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="rounded-full bg-green-100 p-4 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-600"
                >
                  <path d="M15 8h.01" />
                  <rect width="16" height="16" x="4" y="4" rx="3" />
                  <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
                  <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Track Progress with Images
              </h3>
              <div className="my-4 h-0.5 w-10 rounded-full bg-green-600"></div>
              <p className="mt-2 text-center text-gray-600">
                Document your journey with visual proof of progress and
                completion tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex transform flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="rounded-full bg-purple-100 p-4 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="m8 14 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Build Lasting Consistency
              </h3>
              <div className="my-4 h-0.5 w-10 rounded-full bg-purple-600"></div>
              <p className="mt-2 text-center text-gray-600">
                Transform habits through daily tracking and visual motivation to
                develop lifelong consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-blue-50 py-24">
        <div className="bg-grid-slate-400/[0.05] absolute inset-x-0 top-0 -z-0 h-40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-4 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
              TESTIMONIALS
            </span>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <div className="mb-12 h-1 w-16 rounded-full bg-purple-600"></div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="flex flex-col rounded-xl border bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl italic leading-relaxed text-gray-600">
                  &ldquo;This app has really helped me become more conscious and
                  intentional about my behavior.&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center border-t border-gray-100 pt-4">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-md font-semibold text-gray-900">
                    30 Day Me User
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col rounded-xl border bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl italic leading-relaxed text-gray-600">
                  &ldquo;Being able to see my completion rate at a glance is
                  really motivating.&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center border-t border-gray-100 pt-4">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-md font-semibold text-gray-900">
                    30 Day Me User
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DASHBOARD DEMO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              DASHBOARD DEMO
            </span>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Track Your Challenge Progress
            </h2>
            <div className="mb-8 h-1 w-16 rounded-full bg-blue-600"></div>
          </div>

          <div className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Dashboard Description */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Your Progress Dashboard
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Our intuitive dashboard gives you a clear view of all your
                active challenges. At a glance, you can:
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    See completion rates for multiple challenges
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Track your daily progress with visual indicators
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Celebrate your streaks and achievements
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Monitor multiple challenges in one place
                  </span>
                </li>
              </ul>
            </div>

            {/* Video */}
            <div className="flex items-center justify-center">
              <div
                className="relative overflow-hidden rounded-xl shadow-2xl"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  aspectRatio: "600 / 550",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "scale(1)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/dashboard-demo.webp"
                    alt="30 Day Me Dashboard Demo"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Page Demo Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-4 rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
              CHALLENGE PAGE
            </span>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Mark Completions & Upload Progress Photos
            </h2>
            <div className="mb-8 h-1 w-16 rounded-full bg-green-600"></div>
          </div>

          <div className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Description */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Daily Challenge Updates
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Our challenge page makes it easy to document your daily progress
                and stay on track:
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Mark your daily challenge as complete with one click
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Upload before/after photos to track visual progress
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Record notes and reflections for each day
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Compare your progress throughout the challenge
                  </span>
                </li>
              </ul>
            </div>

            {/* Demo Image */}
            <div className="flex items-center justify-center">
              <div
                className="relative overflow-hidden rounded-xl shadow-2xl"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  aspectRatio: "600 / 550",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "scale(1)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/trackdemo.webp"
                    alt="30 Day Me Challenge Page Demo"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Challenge Section */}
      <section className="relative w-full bg-gradient-to-br from-purple-50 to-white py-24">
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="mb-4 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
              CHALLENGE CREATION
            </span>
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              Create Custom Challenges
            </h2>
            <div className="mb-8 h-1 w-16 rounded-full bg-purple-600"></div>
          </div>

          <div className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Description */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Personalize Your Journey
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Creating your own challenge is simple and powerful. With our
                intuitive interface you can:
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Design custom challenges with your own titles and
                    descriptions
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Search through challenge templates for inspiration
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Start multiple challenges and track them simultaneously
                  </span>
                </li>
              </ul>
            </div>

            {/* Demo Image */}
            <div className="flex items-center justify-center">
              <div
                className="relative overflow-hidden rounded-xl shadow-2xl"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  aspectRatio: "600 / 550",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "scale(1)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/createdemo.webp"
                    alt="30 Day Me Challenge Creation Demo"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-8 py-16 shadow-lg sm:px-14 sm:py-20">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to start your 30-day challenge journey?
              </h2>
              <p className="mt-6 text-xl text-gray-600">
                Begin transforming your habits and your life today.
              </p>
              <div className="mt-10">
                <SignInButton forceRedirectUrl="/app">
                  <Button
                    size="lg"
                    className="transform bg-blue-600 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
                  >
                    Start Now
                  </Button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
