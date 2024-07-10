"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { AddTreatementSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addIssue } from "@/actions/add-issue";
import { Chemical, Service } from "@prisma/client";
import { addTreatement } from "@/actions/add-treatment";

interface TreatementsFormProps {
  chemicals: Chemical[];
}
export function TreatementForm({ chemicals }: TreatementsFormProps) {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddTreatementSchema>>({
    resolver: zodResolver(AddTreatementSchema),
    defaultValues: {
      chemicalId: "",
      domesticWaterUsed: "",
      rowWater: 0,
      rowWaterTurbidityAverage: 0,
      treatedWater: 0,
      TreatedWaterTurbidityAverage: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof AddTreatementSchema>) => {
    startTransition(() => {
      addTreatement(values).then((data) => {
        if (data.success) setSuccess(data.success);
        if (data?.error) setError(data.error);
      });
    });

    form.reset();
    setSuccess("");
    setError("");
  };

  if (!isClient) return <Spinner />;

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="rowWater"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Row water (Cubic metre)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rowWaterTurbidityAverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Row water turbidity average (Cubic metre)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatedWater"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treated water (Cubic metre)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="TreatedWaterTurbidityAverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Treated Water Turbidity Average (Cubic metre)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domesticWaterUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>domestic Water Used</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a domestic water used" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HOME">HOME</SelectItem>
                      <SelectItem value="BUILDING">BUILDING</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chemicalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chemical" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {chemicals.map((chemical: Chemical) => (
                        <SelectItem key={chemical.id} value={chemical.id}>
                          {chemical.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            type="submit"
            disabled={isPending}
            className="w-52 hover:bg-sky-400"
          >
            Create new Treatement
          </Button>
        </form>
      </Form>
    </div>
  );
}
