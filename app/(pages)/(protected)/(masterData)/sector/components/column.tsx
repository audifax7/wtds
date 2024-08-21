"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Names",
  },
  {
    accessorKey: "district.name",
    header: "District",
  },
  {
    accessorKey: "district.province.name",
    header: "Province",
  },

  {
    accessorKey: "user.name",
    header: "Created by",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const createdAt = moment(row.getValue("createdAt")).format("LL");
      return createdAt;
    },
  },
];
