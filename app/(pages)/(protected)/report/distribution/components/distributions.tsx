"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Issue,Distribution, User } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { wasacLogo } from "@/public/images/imageData";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { use } from "react";



interface DistributionsListProps {
  distributions: Distribution[];
  user: User;
}

export const Distributions = ({ distributions, user }: DistributionsListProps) => {
  const data: any = [];
 
  const onPrintDistribution = () => {
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });
    var rows: any = [];
    var sum: number = 0;
    distributions.forEach((distribution: any, index: number) => {
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
      <Button onClick={onPrintDistribution}>
        <PrinterIcon />
        <span className="pl-2">PRINT PDF</span>
      </Button>


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
