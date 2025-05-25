import { Leaderboard } from "@/components/organism/Leaderboard";
import { Button } from "@/components/ui/button";
import { validateAdmin } from "@/lib/util";

const Commands = async () => {
  return (
    <div className="mx-auto flex w-2/3 flex-col gap-4 rounded-md bg-neutral-200 p-4 shadow-md">
      <h1 className="text-2xl font-bold">Commands:</h1>
      <div className="flex flex-row gap-2">
        <Button>Compute User Completion</Button>
      </div>
    </div>
  );
};

export default async function Admin() {
  await validateAdmin();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10">
      {/* <Commands /> */}
      <div className="mx-auto flex w-11/12 max-w-[410px]">
        <Leaderboard />
      </div>
    </div>
  );
}
