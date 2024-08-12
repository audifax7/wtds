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

interface DataTableRowActionsTreatementProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActionsTreatenebt<TData>({
  row,
}: DataTableRowActionsTreatementProps<TData>) {
  const treatement: any = row.original;

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
          <Link href={`/reguration/treatement/${treatement.id}`}>Recommandation</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
