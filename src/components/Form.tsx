"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Form = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [queryString, setQueryString] = useState(
    searchParams.get("query")?.toString() || "",
  );

  const getChallengeIdea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (queryString) {
      params.set("query", queryString);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-2"
      onSubmit={getChallengeIdea}
    >
      <label htmlFor="challenge" className="text-lg font-bold">
        What are you searching for?
      </label>
      <div className="mx-auto flex w-1/3 gap-2">
        <input
          type="text"
          name="Challenge"
          className="w-full rounded-md border p-2"
          autoComplete="off"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button className="rounded-md border p-2" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
