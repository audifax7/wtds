"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Issue, Treatment, User } from "@prisma/client";

interface TreatementsListProps {
  treatements: Treatment[];
  user:User;
}

export const Treatements = ({ treatements,user }: TreatementsListProps) => {
  const data:any=[];
  treatements.forEach(function (treatement: any) {
    data.push(
      {
        ...treatement,
        "currentUser":user

      }
    )
  })
    return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

Treatements.Skeleton = function SkeletonTraitementList() {
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
