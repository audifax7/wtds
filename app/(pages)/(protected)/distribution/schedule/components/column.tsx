"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DataTableRowActionsCloseWaterSource } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "scheduleDate",
    header: () => <div className="text-left">Schedule date</div>,
    cell: ({ row }) => {
      const scheduleDate = moment(row.getValue("scheduleDate")).format("ll");
      return scheduleDate;
    },
  },
  {
    accessorKey: "line.name",
    header: "CUSTOMER LOCATION",
  },

  {
    accessorKey: "isOpen",
    header: "IS OPENED",
  },
  {
    accessorKey: "user.name",
    header: "Closed by",
  },
  {
    accessorKey: "openTime",
    header: () => <div className="text-left">Open time</div>,
    cell: ({ row }) => {
      const openTime = moment(row.getValue("openTime")).format("LL");
      return openTime;
    },
  },
  {
    accessorKey: "closeTime",
    header: () => <div className="text-left">Close time</div>,
    cell: ({ row }) => {
      const closeTime = moment(row.getValue("closeTime")).format("LL");
      return closeTime;
    },
  },

  {
    accessorKey: "quantity",
    header: "Quantity in Cubic metre",
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <DataTableRowActionsCloseWaterSource row={row} />,
  },
];
