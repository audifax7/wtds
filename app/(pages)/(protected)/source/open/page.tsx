import { Metadata } from "next";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { OpenWaterSource } from "./components/opened";

export const metadata: Metadata = {
  title: "OPEN WATER SOURCE",
};

export default async function OpenWaterSourcePage() {
  const user = await currentUser();
  const opens: any = await db.sourceAction.findMany({
    where: {
      userId: user.id,
      isOpen: true,
    },
    include: {
      source: true,
      user: true,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between space-y-2 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">OPEN WATER SOURCE</h2>
        <div className="flex items-center space-x-2">
          <Link href={"/source/open/add"}>
            <Button>
              <PlusCircle />
              <span className="pl-2">Add new</span>
            </Button>
          </Link>
        </div>
      </div>
      <OpenWaterSource opens={opens} />
    </>
  );
}
