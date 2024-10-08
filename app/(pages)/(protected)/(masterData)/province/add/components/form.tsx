"use client";

import Link from "next/link";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { AddProvinceSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addProvince } from "@/actions/add-province";

export function ProvinceForm() {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddProvinceSchema>>({
    resolver: zodResolver(AddProvinceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddProvinceSchema>) => {
    startTransition(() => {
      addProvince(values).then((data) => {
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter province name"
                    />
                  </FormControl>
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
            Create new province
          </Button>
        </form>
      </Form>
    </div>
  );
}
