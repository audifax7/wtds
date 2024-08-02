import { Metadata } from "next";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Scheduled } from "./components/scheduled";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "SCHEDULED DISTRIBUTION LINE",
};

export default async function OpenDistributionLinePage() {
  const user = await currentUser();
  const scheduled: any = await db.distribution.findMany({
    where: {
      isOpen: null,
    },
    include: {
      line: true,
      user: true,
    },
  });

  const isSupervisor= user.role=== UserRole.SUPERVISOR;

  return (
    <>
      <div className="flex items-center justify-between space-y-2 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">
          SCHEDULE DISTRIBUTION LINE
        </h2>
        <div className="flex items-center space-x-2">
          {isSupervisor ?
           <Link href={"/distribution/schedule/add"}>
           <Button>
             <PlusCircle />
             <span className="pl-2">Add new schedule</span>
           </Button>
         </Link>
         :null
        }
         
        </div>
      </div>
      <Scheduled scheduled={scheduled} />
    </>
  );
}
