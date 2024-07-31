"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DataTableRowActionsCloseWaterSource } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "line.name",
    header: "Distribution location",
  },
  {
    accessorKey: "quantity",
    header: "Quantity (m3)",
  },

  {
    accessorKey: "user.name",
    header: "Scheduled by",
  },
  {
    accessorKey: "scheduleDate",
    header: () => <div className="text-left">Dchedule date</div>,
    cell: ({ row }) => {
      const scheduleDate = moment(row.getValue("scheduleDate")).format("LL");
      return scheduleDate;
    },
  },
  {
    accessorKey: "comment",
    header: "Distribution comment",
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <DataTableRowActionsCloseWaterSource row={row} />,
  },
];
