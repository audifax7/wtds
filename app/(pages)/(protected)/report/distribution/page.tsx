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
          <h2 className="text-3xl font-bold tracking-tight pb-12">INDUSTRY
          DISTRIBUTION</h2>
        <Distributions user={user} distributions={distributions} />
      </div>
    </>
  );
}
