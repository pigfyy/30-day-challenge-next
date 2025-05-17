import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarIcon,
  ChevronDown,
  Info,
  Trash,
} from "lucide-react";
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
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
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
    startDate: Date;
    endDate: Date;
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
      startDate: new Date(),
      endDate: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
    },
  });

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
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
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-4">
                Change challenge dates
              </span>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger type="button" tabIndex={-1}>
                    <Info className="mt-0.5 h-3 w-3" color="red" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px] whitespace-normal">
                    <p className="text-red-400">
                      WARNING: Changing the dates may delete completion and
                      progress data from days outside of newly defined range.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <DatePickerFormField
                control={form.control}
                name="startDate"
                label=""
              />
              <ArrowRight className="text-muted-foreground" size={24} />
              <DatePickerFormField
                control={form.control}
                name="endDate"
                label=""
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Delete and Submit Buttons */}
        <div className="mt-4 flex justify-between">
          {onDelete && (
            <Popover
              modal={true}
              open={isPopoverOpen}
              onOpenChange={(open) => {
                if (!isDeleting && open !== isPopoverOpen) {
                  setIsPopoverOpen(open);
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
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
                        setIsPopoverOpen(false);
                        onDelete();
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

interface DatePickerFormFieldProps {
  control: any;
  name: string;
  label: string;
}
const DatePickerFormField = ({
  control,
  name,
  label,
}: DatePickerFormFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-center space-y-0">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                defaultMonth={field.value}
                onSelect={(date) => {
                  if (date) {
                    // Preserve the current time from the existing date or use current time
                    const currentTime = field.value || new Date();
                    date.setHours(currentTime.getHours());
                    date.setMinutes(currentTime.getMinutes());
                    date.setSeconds(currentTime.getSeconds());
                    date.setMilliseconds(currentTime.getMilliseconds());
                  }
                  field.onChange(date);
                  setIsOpen(false);
                }}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
