"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DataTableRowActionsCloseWaterSource } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "source.name",
    header: "Water Source",
  },

  {
    accessorKey: "isOpen",
    header: "STATUS",
  },
  {
    accessorKey: "user.name",
    header: "Open by",
  },
  {
    accessorKey: "openTime",
    header: () => <div className="text-left">Open time</div>,
    cell: ({ row }) => {
      const openTime = moment(row.getValue("openTime")).format("LLLL");
      return openTime;
    },
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <DataTableRowActionsCloseWaterSource row={row} />,
  },
];
