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
import { EditTreatementSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSession } from "next-auth/react";
import { Chemical, Treatment } from "@prisma/client";
import { editTreatement } from "@/actions/edit-treatement";

interface TreatementPageProps {
  treatement: Treatment;
  chemicals: Chemical[];
}

export function TreatementEditForm({ treatement, chemicals }: TreatementPageProps) {
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof EditTreatementSchema>>({
    resolver: zodResolver(EditTreatementSchema),
    defaultValues: {
      id: treatement.id,
      rowWater: treatement?.rowWater || undefined,
      rowWaterTurbidityAverage: treatement?.rowWaterTurbidityAverage || undefined,
      treatedWater: treatement?.treatedWater || undefined,
      TreatedWaterTurbidityAverage: treatement?.TreatedWaterTurbidityAverage || undefined,
      phLevel: treatement?.phLevel || undefined,
      chemicalQuantity: treatement?.chemicalQuantity || undefined,
      stage: treatement?.stage || undefined,
      parameter: treatement?.parameter || undefined,
      rowWaterQuality: treatement?.rowWaterQuality || undefined,
      treateWaterQuality: treatement?.treateWaterQuality || undefined,
      treatementObjective: treatement?.treatementObjective || undefined,
      dosage: treatement?.dosage || undefined,
      outCome: treatement?.outCome || undefined,
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
          <div className="space-x-6 grid grid-cols-2">
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
              name="phLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pH Level</FormLabel>
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

            {/* <FormField
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
            /> */}
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
              name="chemicalQuantity"
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
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter stage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parameter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parameter</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter parameter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rowWaterQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Row Water Quality</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter row Water quality"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="treateWaterQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>treated Water Quality</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter treate Water Quality"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="treatementObjective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatement Objective</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter treatement Objective"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter dosage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outCome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Out Come</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter out Come"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
