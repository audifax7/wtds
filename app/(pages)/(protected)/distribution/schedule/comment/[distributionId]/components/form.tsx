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
import { DistributionLineCommentSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSession } from "next-auth/react";
import { Distribution } from "@prisma/client";
import { useIsClient } from "@/hooks/use-is-client";
import { openDistributionLine } from "@/actions/open-distribution-line";
import { Textarea } from "@/components/ui/textarea";
import { comment } from "postcss";
import { distributionLineComment } from "@/actions/distribution-line-comment";

interface DistributionLineCommentPageProps {
  distribution: Distribution;
}

export function DistributionLineCommentForm({
  distribution,
}: DistributionLineCommentPageProps) {
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof DistributionLineCommentSchema>>({
    resolver: zodResolver(DistributionLineCommentSchema),
    defaultValues: {
      id: distribution.id,
      comment:distribution.comment || undefined,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof DistributionLineCommentSchema>
  ) => {
    try {
      startTransition(async () => {
        const data = await distributionLineComment(values);

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
          <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="share comment or changes"
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
            disabled={isPending}
            type="submit"
            className=" hover:bg-sky-400"
          >
            Submit to close distribution line
          </Button>
        </form>
      </Form>
    </div>
  );
}
