import { SignIn, SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In - 30 Day Me",
};

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn forceRedirectUrl={"/app?challenge=new"} />
    </div>
  );
}
