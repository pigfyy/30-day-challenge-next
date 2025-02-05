"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSubmit } from "@/lib/actions/createChallenge";

type ChallengeFormProps = {
  defaultValues?: z.infer<typeof challengeFormSchema>;
  onSubmit: (values: z.infer<typeof challengeFormSchema>) => void;
};

export const challengeFormSchema = z.object({
  title: z.string().nonempty({
    message: "Title is required.",
  }),
  wish: z.string().nonempty({
    message: "Wish is required.",
  }),
  dailyAction: z.string().nonempty({
    message: "Daily action is required.",
  }),
  icon: z.string().nonempty({
    message: "Icon is required.",
  }),
});

function ChallengeForm({ defaultValues, onSubmit }: ChallengeFormProps) {
  const form = useForm<z.infer<typeof challengeFormSchema>>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: defaultValues || {
      title: "",
      wish: "",
      dailyAction: "",
      icon: "✅",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Hydration Challenge" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wish"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wish</FormLabel>
              <FormControl>
                <Input placeholder="Drinking more water every day" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dailyAction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Action</FormLabel>
              <FormControl>
                <Input
                  placeholder="I will drink 8 glasses of water every day"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export function CreateChallenge() {
  return (
    <div className="w-1/4 space-y-5">
      <h1 className="text-xl font-bold">Create Challenge</h1>
      <ChallengeForm onSubmit={handleSubmit} />
    </div>
  );
}

export function EditChallenge() {
  const handleSubmit = (values: z.infer<typeof challengeFormSchema>) => {
    console.log("Updating challenge:", values);
  };

  const defaultValues = {
    title: "Existing Title",
    wish: "Existing Wish",
    dailyAction: "Existing Daily Action",
    icon: "✅",
  };

  return (
    <div className="w-1/4 space-y-5">
      <h1 className="text-xl font-bold">Edit Challenge</h1>
      <ChallengeForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  );
}
