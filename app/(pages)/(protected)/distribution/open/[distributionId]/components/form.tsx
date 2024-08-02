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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { CloseDistributionLineSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSession } from "next-auth/react";
import { Distribution } from "@prisma/client";
import { useIsClient } from "@/hooks/use-is-client";
import { closeDistributionLine } from "@/actions/close-distribution-line";

interface CloseDistributionLinePageProps {
  distribution: Distribution;
}

export function CloseDistributionLineForm({
  distribution,
}: CloseDistributionLinePageProps) {
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof CloseDistributionLineSchema>>({
    resolver: zodResolver(CloseDistributionLineSchema),
    defaultValues: {
      id: distribution.id,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CloseDistributionLineSchema>
  ) => {
    try {
      startTransition(async () => {
        const data = await closeDistributionLine(values);

        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          await update();
          setSuccess(data.success);
        }
      });
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setError("");
      setSuccess("");
    }
  };

  if (!isClient) return <Spinner />;

  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            disabled={isPending}
            type="submit"
            className=" hover:bg-sky-400"
          >
           CLOSE THE LOCATION
          </Button>
        </form>
      </Form>
    </div>
  );
}
