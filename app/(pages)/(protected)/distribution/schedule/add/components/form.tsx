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
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { ScheduleDistributionLineSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Line } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { scheduleDistributionLine } from "@/actions/schedule-distribution-line";


interface ScheduleDistributionLineProps {
  lines: Line[];
}

export function ScheduleDistributionLineForm({ lines }: ScheduleDistributionLineProps) {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ScheduleDistributionLineSchema>>({
    resolver: zodResolver(ScheduleDistributionLineSchema),
    defaultValues: {
      lineId: "",
      scheduleDate: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof ScheduleDistributionLineSchema>) => {
    startTransition(() => {
      scheduleDistributionLine(values).then((data) => {
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
              name="lineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer line</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer line" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lines.map((line: Line) => (
                        <SelectItem key={line.id} value={line.id}>
                          {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (Cubic metre)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      disabled={isPending}
                      type="number"
                      placeholder="Enter quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduleDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Schedule date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
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
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                
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
            Schedule distribution line
          </Button>
        </form>
      </Form>
    </div>
  );
}
