import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Treatements } from "./components/treatements";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import moment from "moment";

export const metadata: Metadata = {
  title: "TREATEMENTS",
};

export default async function TreatementsPage() {
  const user = await currentUser();
  const treatements: any = await db.treatment.findMany({
    include: {
      chemical: true,
      user: true
    },
    orderBy:{
      updatedAt:'desc'
    }
  });

  const isLab = user.role === UserRole.LABORATOR;

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight"></h2>Kimisagara WTP | Date { moment().format('LL')} | Time {moment().format('LTS')} | Techbnician : {user.name}
          <div className="flex items-center space-x-2">
            {isLab ?
              <Link href={"/laboratory/treatement/add"}>
                <Button>
                  <PlusCircle />
                  <span className="pl-2">Set Chemicals</span>
                </Button>
              </Link> :
              null
            }

          </div>
        </div>
        <Treatements user={user} treatements={treatements} />
      </div>
    </>
  );
}
