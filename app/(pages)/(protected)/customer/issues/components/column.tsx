"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsCustomerIssue } from "./data-table-row-actions";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
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
      const createdAt = moment(row.getValue("createdAt")).format("LL");
      return createdAt;
    },
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <DataTableRowActionsCustomerIssue row={row} />,
  },
];
