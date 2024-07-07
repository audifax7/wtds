"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsChemical } from "./data-table-row-actions";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Names",
  },

  {
    accessorKey: "user.name",
    header: "Created by",
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
    cell: ({ row }) => <DataTableRowActionsChemical row={row} />,
  },
];
