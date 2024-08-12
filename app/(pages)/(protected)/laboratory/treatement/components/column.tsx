"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableRowActionsTreatement,
} from "./data-table-row-actions";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "rowWater",
    header: "Row water",
  },

  {
    accessorKey: "rowWaterTurbidityAverage",
    header: "Row water turbidity avarage",
  },
  {
    accessorKey: "treatedWater",
    header: "Treated water",
  },
  {
    accessorKey: "TreatedWaterTurbidityAverage",
    header: "Treated Water Turbidity Average",
  },
  {
    accessorKey: "domesticWaterUsed",
    header: "Domestic WaterUsed",
  },
  {
    accessorKey: "phLevel",
    header: "pH Level",
  },
  {
    accessorKey: "chemical.name",
    header: "Chemical used",
  },

  {
    accessorKey: "chemicalQuantity",
    header: "Chemical in (mg/L)",
  },
  {
    accessorKey: "approved",
    header: "Approval from supevisor",
  },
  {
    accessorKey: "rsbRecommandation",
    header: "RSB recommandation",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const createdAt = moment(row.getValue("createdAt")).format("LLLL");
      return createdAt;
    },
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <DataTableRowActionsTreatement row={row} />,
  },
];
