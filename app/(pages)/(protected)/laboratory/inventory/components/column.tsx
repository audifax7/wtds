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
    accessorKey: "chemical.name",
    header: "Chemical used",
  },

  {
    accessorKey: "quantity",
    header: "Chemical Quantity in (mg/L)",
  },
  {
    accessorKey: "usedQuantity",
    header: "Used Chemical Quantity in (mg/L)",
  },
  {
    accessorKey: "remain",
    header: "Remain Chemical Quantity in (mg/L)",
  },

  {
    accessorKey: "updatedAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const updatedAt = moment(row.getValue("updatedAt")).format("LL");
      return updatedAt;
    },
  },

];
