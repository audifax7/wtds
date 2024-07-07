"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsStaffAccount } from "./data-table-row-actions";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "service.name",
    header: "Service",
  },

  {
    accessorKey: "content",
    header: "Issue",
  },
  {
    accessorKey: "response",
    header: "Response",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const createdAt = moment(row.getValue("createdAt")).format("LLLL");
      return createdAt;
    },
  },
];
