"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { InputHint } from "@/components/input-hint";

import { SampleSizeInput } from "./sample-size-input";
import { DurationInput } from "./duration-input";
import { trpc } from "@/lib/trpc";

const Page = () => {
  const createExperiment = trpc.createExperiment.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  console.log(createExperiment.isLoading);

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Create new experiment</h1>

      <form
        className="space-y-6 max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());

          const name = data["experiment-name"] as string;
          const description =
            (data["experiment-description"] as string) || undefined;
          const startedAt = new Date(data["experiment-startedAt"] as string);
          const endedAt = new Date(data["experiment-endedAt"] as string);
          const sampleSizeAbsolute =
            parseInt(data["experiment-sampleSizeAbsolute"] as string) ||
            undefined;
          const sampleSizeRelative =
            parseFloat(data["experiment-sampleSizeRelative"] as string) / 100 ||
            undefined;

          createExperiment.mutate({
            name,
            description,
            startedAt,
            endedAt,
            sampleSizeAbsolute,
            sampleSizeRelative,
          });
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="experiment-name">Experiment name</Label>
            <InputHint>
              Give your experiment a descriptive name so you can easily find it
              later.
            </InputHint>
          </div>
          <Input
            id="experiment-name"
            name="experiment-name"
            placeholder='E.g. "Logo color" or "Homepage redesign"'
            required
          ></Input>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="experiment-description">Description</Label>
            <InputHint>
              Optional: Describe what you are testing and why. This will help
              you and your team understand the experiment later.
            </InputHint>
          </div>
          <Textarea
            id="experiment-description"
            name="experiment-description"
          ></Textarea>
        </div>
        <DurationInput />
        <SampleSizeInput />
        <div className="flex justify-end">
          <Button type="submit" disabled={createExperiment.isLoading}>
            Create experiment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
