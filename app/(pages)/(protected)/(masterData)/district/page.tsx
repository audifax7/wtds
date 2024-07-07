import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Districts } from "./components/districts";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "DISTRICTS",
};

export default async function DistrictsPage() {
  const user = await currentUser();
  const districts: any = await db.district.findMany({
    include: {
      user: true,
      province: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">DISTRICT LIST</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/district/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add district</span>
              </Button>
            </Link>
          </div>
        </div>
        <Districts districts={districts} />
      </div>
    </>
  );
}
