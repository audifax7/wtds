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
import { useState, useTransition } from "react";
import { PasswordInput } from "@/components/password-input";
import { useIsClient } from "@/hooks/use-is-client";
import { EditTreatementSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSession } from "next-auth/react";
import { settings } from "@/actions/settings";
import { Treatment, UserRole } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { editTreatement } from "@/actions/edit-treatement";

interface TreatementFeebackPageProps {
  treatement: Treatment;
}

export function TreatementFeedbackForm({
  treatement,
}: TreatementFeebackPageProps) {
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof EditTreatementSchema>>({
    resolver: zodResolver(EditTreatementSchema),
    defaultValues: {
      id: treatement.id,
      rsbRecommandation: treatement?.rsbRecommandation || undefined,
      rsbStatus:treatement.rsbStatus || undefined
    },
  });

  const onSubmit = async (values: z.infer<typeof EditTreatementSchema>) => {
    try {
      startTransition(async () => {
        const data = await editTreatement(values);

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
              name="rsbStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>domestic Water Used</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={treatement.rsbStatus} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="APPROVE">APPROVE</SelectItem>
                      <SelectItem value="REJECT">REJECT</SelectItem>
                      <SelectItem value="FOLLOW UP">FOLLOW UP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rsbRecommandation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommandation </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="add recommandation"
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
            className="w-52 hover:bg-sky-400"
          >
            SUBMIT DECISION
          </Button>
        </form>
      </Form>
    </div>
  );
}
