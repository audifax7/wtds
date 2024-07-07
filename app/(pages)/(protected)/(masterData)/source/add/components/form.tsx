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
import { AddWaterSourceSchema } from "@/schemas";
import Spinner from "@/components/spinner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useIsClient } from "@/hooks/use-is-client";
import { Input } from "@/components/ui/input";
import { Cell, District, Province, Sector, Village } from "@prisma/client";
import { addVillage } from "@/actions/add-village";
import { addWaterSource } from "@/actions/add-water-source";

interface WaterSourcesFormProps {
  districts: District[];
  provinces: Province[];
  sectors: Sector[];
  cells: Cell[];
  villages: Village[];
}
export function WaterSourceForm({
  districts,
  provinces,
  sectors,
  cells,
  villages,
}: WaterSourcesFormProps) {
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const defaultProvince = provinces.find(
    (province) => province.name === "KIGALI"
  );

  const defaultDistrict = districts.find(
    (district) => district.name === "NYARUGENGE"
  );

  const defaultSector = sectors.find((sector) => sector.name === "NYAMIRAMBO");

  const defaultCell = cells.find((cell) => cell.name === "KIVUGIZA");

  const [province, setProvince] = useState({
    value: defaultProvince?.id,
  });

  const [district, setDistrict] = useState({
    value: defaultDistrict?.id,
  });

  const [sector, setSector] = useState({
    value: defaultSector?.id,
  });
  const [cell, setCell] = useState({
    value: defaultCell?.id,
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

  const handleChangeCell = (value: any) => {
    setSector({ value: value });
  };

  const handleChangeVillage = (value: any) => {
    setCell({ value: value });
  };

  let districtSector = sectors.filter(
    (sector) => sector.districtId === district.value
  );

  let sectorCell = cells.filter((cell) => cell.sectorId === sector.value);
  let cellVillage = villages.filter((village) => village.cellId === cell.value);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddWaterSourceSchema>>({
    resolver: zodResolver(AddWaterSourceSchema),
    defaultValues: {
      name: "",
      cellId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddWaterSourceSchema>) => {
    startTransition(() => {
      addWaterSource(values).then((data) => {
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
                    onValueChange={handleChangeCell}
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
              name="cellId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cell</FormLabel>
                  <Select
                    onValueChange={handleChangeVillage}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cell" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sectorCell.map((cell: Cell) => (
                        <SelectItem key={cell.id} value={cell.id}>
                          {cell.name}
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
              name="villageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cell</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cell" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cellVillage.map((village: Village) => (
                        <SelectItem key={village.id} value={village.id}>
                          {village.name}
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
            Create new water source
          </Button>
        </form>
      </Form>
    </div>
  );
}
