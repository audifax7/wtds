"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { SourceAction, User } from "@prisma/client";

interface OpenWaterSourceListProps {
  opens: SourceAction[];
}

export const OpenWaterSource = ({ opens }: OpenWaterSourceListProps) => {
  return (
    <>
      <DataTable columns={columns} data={opens} />
    </>
  );
};

OpenWaterSource.Skeleton = function SkeletonPlannedList() {
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
