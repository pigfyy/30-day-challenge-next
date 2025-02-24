"use client";

import { useUrlState } from "@/hooks/use-url-state";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "./ui/button";

export const BackButton = () => {
  const { removeQueryParam } = useUrlState();

  const handleClick = () => {
    removeQueryParam("challenge");
  };

  return (
    <Button onClick={handleClick} size={"icon"}>
      <ArrowLeftFromLine />
    </Button>
  );
};
