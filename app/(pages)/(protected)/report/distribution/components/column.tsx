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
    accessorKey: "line.name",
    header: "LINE",
  },

  {
    accessorKey: "quantity",
    header: "QUANTITY",
  },
  {
    accessorKey: "openTime",
    header: () => <div className="text-left">OPEN AT</div>,
    cell: ({ row }) => {
      const openTime = moment(row.getValue("openTime")).format("LL");
      return openTime;
    },
  },
  {
    accessorKey: "closeTime",
    header: () => <div className="text-left">CLOSE AT</div>,
    cell: ({ row }) => {
      const closeTime = moment(row.getValue("closeTime")).format("LL");
      return closeTime;
    },
  },

  {
    accessorKey: "user.name",
    header: "DISTRIBUTED BY",
  }, 

  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">CREATED AT</div>,
    cell: ({ row }) => {
      const createdAt = moment(row.getValue("createdAt")).format("LL");
      return createdAt;
    },
  },

];
