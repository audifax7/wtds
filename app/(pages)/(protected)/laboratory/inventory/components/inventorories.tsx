"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Inventory, Issue, Treatment, User } from "@prisma/client";

interface InventorysListProps {
  inventories: Inventory[];
  user:User;
}

export const Inventories = ({ inventories,user }: InventorysListProps) => {
  const data:any=[];
  inventories.forEach(function (inventory: Inventory) {
    data.push(
      {
        ...inventory,
        "currentUser":user,
        "remain":inventory.quantity- inventory.usedQuantity

      }
    )
  })
    return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

Inventories.Skeleton = function SkeletonInventoryList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
