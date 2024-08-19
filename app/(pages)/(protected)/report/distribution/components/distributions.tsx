"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Distribution, User } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { wasacLogo } from "@/public/images/imageData";
import moment from "moment";
import { format } from "date-fns"
import { CalendarIcon, PrinterIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsClient } from "@/hooks/use-is-client";
import { useState, useTransition } from "react";
import { ReportSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";


interface DistributionsListProps {
  distributions: Distribution[];
  user: User;
}

export const Distributions = ({ distributions, user }: DistributionsListProps) => {
  const data: any = [];
  const isClient = useIsClient();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof ReportSchema>) => {
    startTransition(() => {
      const distributionsFilter = distributions.filter((item: any) =>
        item.closeTime.getTime() >= values.fromDate.getTime() && item.closeTime.getTime() <= values.toDate.getTime()
      );
      onPrintDistribution(distributionsFilter);
    });

    form.reset();
    setSuccess("");
    setError("");
  };
 
  const onPrintDistribution = (distributionsFilter:any[]) => {
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
    var rows: any = [];
    var sum: number = 0;
    distributionsFilter.forEach((distribution: any, index: number) => {
      var temp = [
        (index += 1),
        moment(distribution.createdAt).format("YYYY-MM-DD"),
        distribution.line.name,
        distribution.quantity,
        moment(distribution.openTime).format("LLL"),
        moment(distribution.closeTime).format("LLL"),
        distribution.user.name,
      ];
      rows.push(temp);
    });


    autoTable(doc, {
      didDrawPage: function (data) {
        doc.addImage(wasacLogo, "JPEG", 4, 0, 45, 30);
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 42, 290, 42);
      },

      theme: "plain",
      styles: {
        halign: "left",
        fontSize: 20,
        textColor: "#47afee",
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              `Printed by: ${user.name}` +
              `\nDate: ${moment(new Date()).format("YYYY-MM-DD")}` +
              `\n`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: `WASAC INDUSTRY DISTRIBUTED ${moment(new Date()).format("YYYY-MM-DD")}	`,
            styles: {
              halign: "center",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      head: [
        [
          "NO",
          "DATE",
          "LINE",
          "QUANTITY",
          "OPEN AT",
          "CLOSE AT",
          "OFFICER NAME",
        ],
      ],
      body: rows,
      theme: "striped",
      headStyles: {
        fillColor: "#47afee",
      },
    });

    
    return doc.save(`${moment(new Date()).format("YYYY-MM-DD")}_distribution_report`);
  };
  return (
    <>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-8 flex flex-row">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-row space-x-4">
                <FormLabel>From date</FormLabel>
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
                        date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-row space-x-4">
                <FormLabel>To date</FormLabel>
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
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="space-x-4">         <PrinterIcon />
            <span>Print PDF</span></Button>
        </form>
      </Form>


      <DataTable columns={columns} data={distributions} />
    </>
  );
};

Distributions.Skeleton = function SkeletonDistributionList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
