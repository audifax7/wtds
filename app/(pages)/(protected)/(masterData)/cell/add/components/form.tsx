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
import { AddCellSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useIsClient } from "@/hooks/use-is-client";
import { Input } from "@/components/ui/input";
import { District, Province, Sector } from "@prisma/client";
import { addSector } from "@/actions/add-sector";
import { addCell } from "@/actions/add-cell";

interface CellsFormProps {
  districts: District[];
  provinces: Province[];
  sectors: Sector[];
}
export function CellForm({ districts, provinces, sectors }: CellsFormProps) {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const defaultProvince = provinces.find(
    (province) => province.name === "KIGALI"
  );

  const defaultDistrict = districts.find(
    (district) => district.name === "NYARUGENGE"
  );

  const [province, setProvince] = useState({
    value: defaultProvince?.id,
  });

  const [district, setDistrict] = useState({
    value: defaultDistrict?.id,
  });

  const handleChangeDistrict = (value: any) => {
    setProvince({ value: value });
  };

  let provinceDistrict = districts.filter(
    (district) => district.provinceId === province.value
  );

  const handleChangeSector = (value: any) => {
    setDistrict({ value: value });
  };

  let districtSector = sectors.filter(
    (sector) => sector.districtId === district.value
  );

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddCellSchema>>({
    resolver: zodResolver(AddCellSchema),
    defaultValues: {
      name: "",
      districtId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddCellSchema>) => {
    startTransition(() => {
      addCell(values).then((data) => {
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
              name="provinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={handleChangeDistrict}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province: Province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
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
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={handleChangeSector}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinceDistrict.map((district: District) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
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
              name="sectorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districtSector.map((sector: Sector) => (
                        <SelectItem key={sector.id} value={sector.id}>
                          {sector.name}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Please enter name"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
