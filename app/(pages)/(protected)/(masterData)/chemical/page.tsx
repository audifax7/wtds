import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Chemicals } from "./components/chemicals";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "CHEMICAL",
};

export default async function ChemicalPage() {
  const chemicals: any = await db.chemical.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            CHEMICAL TO BE USED
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/chemical/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add chemical</span>
              </Button>
            </Link>
          </div>
        </div>
        <Chemicals chemicals={chemicals} />
      </div>
    </>
  );
}
