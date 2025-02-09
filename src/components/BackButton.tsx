"use client";

import { ArrowLeftFromLine } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export const BackButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("challenge");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button onClick={handleClick} size={"icon"}>
      <ArrowLeftFromLine />
    </Button>
  );
};
