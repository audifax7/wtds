"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@prisma/client";
import { Row, RowExpanding } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsTreatementProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActionsTreatement<TData>({
  row,
}: DataTableRowActionsTreatementProps<TData>) {
  const treatement: any = row.original;

  const isSupervisor = treatement.currentUser.role === UserRole.SUPERVISOR;
  const isRSB = treatement.currentUser.role === UserRole.RSB;
  console.log(treatement.currentUser)
  console.log({"sup": isSupervisor,"RSB":isRSB})

  return (
    <>
      {isRSB || isSupervisor ?
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
            {isSupervisor ?
              <DropdownMenuItem>
                <Link href={`/laboratory/treatement/${treatement.id}`}>
                  Make decision
                </Link>
              </DropdownMenuItem> :
              null}
            {isRSB ?
              <DropdownMenuItem>
                <Link href={`/regulation/treatement/${treatement.id}`}>
                  Recommandation
                </Link>
              </DropdownMenuItem> :
              null
            }
          </DropdownMenuContent>
        </DropdownMenu> :
        null
      }
    </>

  );
}
