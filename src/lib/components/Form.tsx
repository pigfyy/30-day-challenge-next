"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Form = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [queryString, setQueryString] = useState(
    searchParams.get("query")?.toString() || ""
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
      className="flex flex-col gap-2 w-full items-center"
      onSubmit={getChallengeIdea}
    >
      <label htmlFor="challenge" className="font-bold text-lg">
        What are you searching for?
      </label>
      <div className="flex w-1/3 mx-auto gap-2">
        <input
          type="text"
          name="Challenge"
          className="border rounded-md p-2 w-full"
          autoComplete="off"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button className="p-2 border rounded-md" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
