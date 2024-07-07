import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Provinces } from "./components/province";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "PROVINCE",
};

export default async function ProvincePage() {
  const provinces: any = await db.province.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">PROVINCE LIST</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/province/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add province</span>
              </Button>
            </Link>
          </div>
        </div>
        <Provinces provinces={provinces} />
      </div>
    </>
  );
}
