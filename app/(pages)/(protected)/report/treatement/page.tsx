import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Treatements } from "./components/treatements";
import { PlusCircle, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "TREATEMENTS REPORT",
};

export default async function TreatementsPage() {
  const user = await currentUser();
  const treatements: any = await db.treatment.findMany({
    include: {
      chemical: true,
      user: true
    },
  });

  const isLab = user.role === UserRole.LABORATOR;

  return (
    <>
      <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight pb-12">INDUSTRY
          TREATEMENTS</h2>

        <Treatements user={user} treatements={treatements} />
      </div>
    </>
  );
}
