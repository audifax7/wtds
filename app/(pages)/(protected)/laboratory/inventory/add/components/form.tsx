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
import { useIsClient } from "@/hooks/use-is-client";
import { AddInventorySchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Chemical } from "@prisma/client";
import { addInventory } from "@/actions/add-inventory";

interface InventoriesFormProps {
  chemicals: Chemical[];
}
export function InventoryForm({ chemicals }: InventoriesFormProps) {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddInventorySchema>>({
    resolver: zodResolver(AddInventorySchema),
    defaultValues: {
      chemicalId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddInventorySchema>) => {
    startTransition(() => {
      addInventory(values).then((data) => {
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
              name="chemicalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chemical</FormLabel>
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

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                   Chemical Quantity (mg/L)
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
          </div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            type="submit"
            disabled={isPending}
            className="w-52 hover:bg-sky-400"
          >
            Create new inventory
          </Button>
        </form>
      </Form>
    </div>
  );
}
