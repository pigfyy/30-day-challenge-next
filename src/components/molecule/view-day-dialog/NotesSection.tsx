import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Textarea } from "../../ui/textarea";
import { ChevronDown } from "lucide-react";

interface NotesSectionProps {
  note: string;
  onNoteChange: (note: string) => void;
}

export const NotesSection = ({ note, onNoteChange }: NotesSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-8">
        <span className="text-md font-bold">Notes</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Separator className="mb-5 mt-1" />
      <CollapsibleContent>
        <Textarea
          placeholder="Add your notes for this day..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="min-h-[100px]"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
