"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row, RowExpanding } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsCloseWaterSourceProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActionsCloseWaterSource<TData>({
  row,
}: DataTableRowActionsCloseWaterSourceProps<TData>) {
  const distribution: any = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link href={`/distribution/schedule/${distribution.id}`}>
            OPEN LINE
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/distribution/schedule/comment/${distribution.id}`}>
            COMMENT LINE
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
