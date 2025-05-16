import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Info, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const challengeFormSchema = z.object({
  title: z
    .string()
    .nonempty({
      message: "Title is required.",
    })
    .max(75, {
      message: "Title must be at most 75 characters long.",
    }),
  wish: z
    .string()
    .nonempty({
      message: "Wish is required.",
    })
    .max(250, {
      message: "Wish must be at most 250 characters long.",
    }),
  dailyAction: z
    .string()
    .nonempty({
      message: "Daily action is required.",
    })
    .max(250, {
      message: "Daily action must be at most 250 characters long.",
    }),
  icon: z
    .string()
    .emoji({
      message: "Icon must be an emoji.",
    })
    .max(2, {
      message: "Icon cannot be longer then 2 emojis",
    }),
});

export const ChallengeForm = ({
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  isDeleting = false,
}: {
  defaultValues?: {
    title: string;
    wish: string;
    dailyAction: string;
    icon: string;
  };
  onSubmit: (values: any) => void;
  onDelete?: () => void;
  disabled: boolean;
  isDeleting?: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: defaultValues || {
      title: "",
      wish: "",
      dailyAction: "",
      icon: "✅",
    },
  });

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <CustomFormField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Hydration Challenge"
          tooltipContent="Find a title for the challenge that will make it easy to remember."
        />
        <CustomFormField
          control={form.control}
          name="wish"
          label="Wish"
          placeholder="Drinking more water every day"
          tooltipContent="Find a change you want to make or a skill you want to learn most."
        />
        <CustomFormField
          control={form.control}
          name="dailyAction"
          label="Daily Action"
          placeholder="I will drink 8 glasses of water every day"
          tooltipContent="Have an action plan for every day. Make it simple and doable. How would you like to work towards your wish?"
        />
        <CustomFormField
          control={form.control}
          name="icon"
          label="Icon"
          placeholder="✅"
          tooltipContent="Find an icon that best respresents your challenge"
        />

        <Collapsible
          open={isCollapsibleOpen}
          onOpenChange={setIsCollapsibleOpen}
        >
          <div className="flex items-center justify-between gap-8">
            <span className="text-sm font-semibold text-red-800">
              Advanced Settings
            </span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isCollapsibleOpen ? "rotate-180" : ""}`}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-4">
                Change challenge start and end dates
              </span>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger type="button" tabIndex={-1}>
                    <Info className="mt-0.5 h-3 w-3" color="red" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] whitespace-normal">
                    <p className="text-red-400">
                      WARNING: Changing the start and end dates may delete
                      completion and progress data from days outside of newly
                      defined range.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Delete and Submit Buttons */}
        <div className="mt-4 flex justify-between">
          {onDelete && (
            <Popover
              open={isPopoverOpen}
              onOpenChange={(open) => {
                if (!isDeleting) {
                  setIsPopoverOpen(open);
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-500"
                  disabled={disabled}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex h-full flex-col gap-2">
                  <p className="text-sm text-gray-600">Are you sure?</p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        onDelete();
                        setIsPopoverOpen(false);
                      }}
                      disabled={isDeleting}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsPopoverOpen(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

interface CustomFormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  tooltipContent: string;
}
export const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
  tooltipContent,
}: CustomFormFieldProps) => {
  const additionalPlaceholderClasses =
    name === "icon" ? "placeholder:opacity-25" : "";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel className="leading-4">{label}</FormLabel>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger type="button" tabIndex={-1}>
                  <Info className="mt-0.5 h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] whitespace-normal">
                  <p>{tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormControl>
            <AutosizeTextarea
              placeholder={placeholder}
              {...field}
              className={`resize-none ${additionalPlaceholderClasses}`}
              maxHeight={56}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
