"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, PrinterIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Treatment, User } from "@prisma/client";
import { useIsClient } from "@/hooks/use-is-client";
import { useState, useTransition } from "react";
import { ReportSchema } from "@/schemas";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { wasacLogo } from "@/public/images/imageData";
import Spinner from "@/components/spinner";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Skeleton } from "@/components/ui/skeleton";





interface TreatementsListProps {
  treatements: Treatment[];
  user: User;
}

export const Treatements = ({ treatements, user }: TreatementsListProps) => {

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
      const treatementsFilter = treatements.filter((item: any) =>
        item.createdAt.getTime() >= values.fromDate.getTime() && item.createdAt.getTime() <= values.toDate.getTime()
      );
      onPrintTreatement(treatementsFilter);
      console.log({ treatements })
    });

    form.reset();
    setSuccess("");
    setError("");
  };

  const data: any = [];
  treatements.forEach(function (treatement: any) {
    data.push(
      {
        ...treatement,
        "currentUser": user

      }
    )
  })
  const onPrintTreatement = (treatementsFilter: any[]) => {
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
    var rows: any = [];
    var sum: number = 0;
    treatementsFilter.forEach((treatement: any, index: number) => {
      var temp = [
        (index += 1),
        moment(treatement.createdAt).format("YYYY-MM-DD"),
        treatement.rowWater,
        treatement.rowWaterTurbidityAverage,
        treatement.treatedWater,
        treatement.TreatedWaterTurbidityAverage,
        treatement.chemical.name,
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
            content: `WASAC Industry water treatement ${moment(new Date()).format("YYYY-MM-DD")}	`,
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
          "No",
          "Date",
          "Row data (m3)",
          "RowWaterTurbidity (Avg)",
          "Treated Water (m3)",
          "Treated Water Turbidity Avg",
          "Chemical Used",
        ],
      ],
      body: rows,
      theme: "striped",
      headStyles: {
        fillColor: "#47afee",
      },
    });


    return doc.save(`${moment(new Date()).format("YYYY-MM-DD")}_treatement_report`);
  };

  if (!isClient) return <Spinner />;

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

      <DataTable columns={columns} data={data} />
    </>
  );
};

Treatements.Skeleton = function SkeletonTraitementList() {
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
