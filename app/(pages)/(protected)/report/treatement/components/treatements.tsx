"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Issue, Treatment, User } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { wasacLogo } from "@/public/images/imageData";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { use } from "react";



interface TreatementsListProps {
  treatements: Treatment[];
  user: User;
}

export const Treatements = ({ treatements, user }: TreatementsListProps) => {
  const data: any = [];
  treatements.forEach(function (treatement: any) {
    data.push(
      {
        ...treatement,
        "currentUser": user

      }
    )
  })
  const onPrintTreatement = () => {
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
    var rows: any = [];
    var sum: number = 0;
    treatements.forEach((treatement: any, index: number) => {
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
        textColor: "#ffffff",
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
        fillColor: "#343a40",
      },
    });

    
    return doc.save(`${moment(new Date()).format("YYYY-MM-DD")}_treatement_report`);
  };
  return (
    <>
      <Button onClick={onPrintTreatement}>
        <PrinterIcon />
        <span className="pl-2">PRINT PDF</span>
      </Button>


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
