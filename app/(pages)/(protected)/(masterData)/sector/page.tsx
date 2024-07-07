import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Sectors } from "./components/sectors";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "DISTRICTS",
};

export default async function SectorsPage() {
  const user = await currentUser();
  const sectors: any = await db.sector.findMany({
    include: {
      user: true,
      district: {
        include: {
          province: true,
        },
      },
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">SECTOR LIST</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/sector/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add sector</span>
              </Button>
            </Link>
          </div>
        </div>
        <Sectors sectors={sectors} />
      </div>
    </>
  );
}
