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
import { OpenDistributionLineSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSession } from "next-auth/react";
import { closeWaterSource } from "@/actions/close-water-source";
import { Distribution } from "@prisma/client";
import { useIsClient } from "@/hooks/use-is-client";
import { closeDistributionLine } from "@/actions/close-distribution-line";
import { openDistributionLine } from "@/actions/open-distribution-line";

interface OpenDistributionLinePageProps {
  distribution: Distribution;
}

export function OpenDistributionLineForm({
  distribution,
}: OpenDistributionLinePageProps) {
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof OpenDistributionLineSchema>>({
    resolver: zodResolver(OpenDistributionLineSchema),
    defaultValues: {
      id: distribution.id,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof OpenDistributionLineSchema>
  ) => {
    try {
      startTransition(async () => {
        const data = await openDistributionLine(values);

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
          <div className="space-y-4">
            
          </div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            disabled={isPending}
            type="submit"
            className=" hover:bg-sky-400"
          >
            OPEN THE LOCATION
          </Button>
        </form>
      </Form>
    </div>
  );
}
