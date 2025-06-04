"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function QuestionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-6"
      >
        <CardHeader className="flex flex-col justify-between">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 text-left [&[data-state=open]>svg]:rotate-180">
            <div className="flex flex-1 flex-col gap-1.5">
              <CardTitle>{title}</CardTitle>
              {description ? (
                <CardDescription>{description}</CardDescription>
              ) : null}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
