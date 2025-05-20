import { SignIn, SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign Up - 30 Day Me" };

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp forceRedirectUrl={"/app?challenge=new"} signInUrl="/sign-in" />
    </div>
  );
}
