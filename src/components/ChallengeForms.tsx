import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpandableText from "@/components/ui/expandable-text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeIdeaResult } from "@/lib/db/challengeIdeas";
import { trpc } from "@/lib/util/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Challenge } from "@prisma/client";
import { Loader2, MoreVertical, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  icon: z
    .string()
    .nonempty({ message: "Icon is required." })
    .refine(
      (value) => {
        const singleEmojiRegex =
          /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})?)$/u;
        return singleEmojiRegex.test(value);
      },
      { message: "Icon must be a single emoji." },
    ),
});

const ChallengeForm = ({
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

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
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
        <div className="mt-4 flex justify-between">
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
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
                <Button variant="ghost" size="icon" disabled={disabled}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                {isConfirmingDelete ? (
                  <div className="flex h-full flex-col gap-2">
                    <p className="text-sm text-gray-600">Are you sure?</p>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={onDelete}
                        disabled={isDeleting}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setIsConfirmingDelete(false)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-500"
                    onClick={() => setIsConfirmingDelete(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </form>
    </Form>
  );
};

interface ChallengeIdeaProps {
  challengeIdea: ChallengeIdeaResult;
  activeChallengeId: number | null;
  onJoinChallenge: (challengeIdea: ChallengeIdeaResult) => void;
}

export const ChallengeIdea = ({
  challengeIdea,
  activeChallengeId,
  onJoinChallenge,
}: ChallengeIdeaProps) => {
  const isActive = activeChallengeId === challengeIdea.id;
  const disabled = activeChallengeId !== null;

  return (
    <Card
      key={challengeIdea.id}
      className="transition-shadow duration-300 hover:shadow-xl"
    >
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          {challengeIdea.title}
        </CardTitle>
        <CardDescription>
          <ExpandableText text={challengeIdea.description} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Wish: </span>
          {challengeIdea.wish}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Daily Action: </span>
          {challengeIdea.dailyAction}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Source: </span>
          <a
            href={challengeIdea.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {challengeIdea.sourceName}
          </a>
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onJoinChallenge(challengeIdea)}
          disabled={disabled}
        >
          {isActive ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Join Challenge"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ChallengeSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChallengeIdeaResult[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<number | null>(
    null,
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const utils = trpc.useUtils();

  const { mutate: createChallenge } =
    trpc.challenge.createChallenge.useMutation({
      onSuccess: async (challenge) => {
        await utils.challenge.getChallenges.invalidate();
        const params = new URLSearchParams(searchParams);
        params.set("challenge", challenge.id);
        replace(`${pathname}?${params.toString()}`);
        setActiveChallengeId(null);
      },
      onError: () => {
        setActiveChallengeId(null);
      },
    });

  const {
    mutateAsync: searchChallenges,
    isPending: isSearchChallengesPending,
  } = trpc.challengeIdea.search.useMutation();

  const handleJoinChallenge = (challengeIdea: ChallengeIdeaResult) => {
    if (activeChallengeId !== null) return;
    setActiveChallengeId(challengeIdea.id);
    createChallenge({
      title: challengeIdea.title,
      wish: challengeIdea.wish,
      dailyAction: challengeIdea.dailyAction,
      icon: "✅",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) {
      setResults([]);
      return;
    }
    const response = await searchChallenges(query);
    setResults(response);
  };

  return (
    <>
      {!results.length && !isSearchChallengesPending && (
        <CardHeader className="w-full pb-3 text-left">
          <CardTitle>Find Challenges</CardTitle>
          <CardDescription>
            Looking for inspiration? Find challenge ideas to kickstart your
            journey to a healthier lifestyle.
          </CardDescription>
        </CardHeader>
      )}

      <form onSubmit={handleSubmit} className="mb-6 flex w-full gap-2 px-6">
        <Input
          placeholder="Search challenges..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {(results.length || isSearchChallengesPending) && (
        <ScrollArea className="flex h-full w-full flex-col items-center justify-center px-6">
          {!isSearchChallengesPending ? (
            <div className="mb-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
              {results.map((result) => (
                <ChallengeIdea
                  key={result.id}
                  challengeIdea={result}
                  activeChallengeId={activeChallengeId}
                  onJoinChallenge={handleJoinChallenge}
                />
              ))}
            </div>
          ) : (
            <div className="mb-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                >
                  <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="mt-2 h-4 w-full" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-8 w-32" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      )}
    </>
  );
};

export function CreateChallenge() {
  const utils = trpc.useUtils();
  const { data: challenges } = trpc.challenge.getChallenges.useQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { mutate, isPending } = trpc.challenge.createChallenge.useMutation({
    onSuccess: async (challenge) => {
      await utils.challenge.getChallenges.invalidate();
      const params = new URLSearchParams(searchParams);
      params.set("challenge", challenge.id);
      replace(`${pathname}?${params.toString()}`);
    },
  });

  const [leftCardHeight, setLeftCardHeight] = useState<number>(0);
  const leftCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = leftCardRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          setLeftCardHeight(entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof challengeFormSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex w-full flex-wrap justify-center gap-6">
      <div ref={leftCardRef} className="w-full md:w-1/3">
        <Card className="w-full">
          <CardHeader>
            {challenges?.length ? (
              <div className="mb-6">
                <BackButton />
              </div>
            ) : null}
            <CardTitle className="text-xl font-bold">
              Create Challenge
            </CardTitle>
            <CardDescription>
              Set up your new challenge details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChallengeForm onSubmit={onSubmit} disabled={isPending} />
          </CardContent>
        </Card>
      </div>

      <Card
        className="flex w-full flex-col md:w-1/3"
        style={{ height: leftCardHeight }}
      >
        <CardContent className="flex h-full flex-col items-center justify-center p-0 pt-6">
          <ChallengeSearch />
        </CardContent>
      </Card>
    </div>
  );
}

export function EditChallenge({
  challenge,
  setIsDialogOpen,
}: {
  challenge: Challenge;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const utils = trpc.useUtils();

  const { mutate: updateChallenge, isPending: isUpdatePending } =
    trpc.challenge.updateChallenge.useMutation({
      onSettled: async () => {
        await utils.challenge.getChallenges.invalidate();
        setIsDialogOpen(false);
      },
    });
  const { mutate: deleteChallenge, isPending: isDeletePending } =
    trpc.challenge.deleteChallenge.useMutation({
      onSettled: async () => {
        await utils.challenge.getChallenges.invalidate();
        setIsDialogOpen(false);

        const params = new URLSearchParams(searchParams);
        params.delete("challenge");
        replace(`${pathname}?${params.toString()}`);
      },
    });

  const handleSubmit = async (values: z.infer<typeof challengeFormSchema>) => {
    updateChallenge({
      ...challenge,
      ...values,
    });
  };

  const handleDelete = () => {
    deleteChallenge(challenge.id);
  };

  const defaultValues = {
    title: challenge.title,
    wish: challenge.wish,
    dailyAction: challenge.dailyAction,
    icon: challenge.icon,
  };

  return (
    <ChallengeForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      disabled={isUpdatePending || isDeletePending}
      isDeleting={isDeletePending}
    />
  );
}
