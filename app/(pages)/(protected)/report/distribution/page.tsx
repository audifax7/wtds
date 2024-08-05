import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Distributions } from "./components/distributions";
import { PlusCircle, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "TREATEMENTS REPORT",
};

export default async function DistributionsPage() {
  const user = await currentUser();
  const distributions: any = await db.distribution.findMany({
    where: {
      isOpen: false
    },
    include: {
      line: true,
      user: true,
    },
  });;


  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight"></h2>INDUSTRY
          DISTRIBUTION
        </div>
        <Distributions user={user} distributions={distributions} />
      </div>
    </>
  );
}
