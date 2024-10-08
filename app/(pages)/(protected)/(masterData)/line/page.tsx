import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Lines } from "./components/lines";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "LOCATIONS",
};

export default async function LinePage() {
  const lines: any = await db.line.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">WASAC DISTRIBUTION LOCATION</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/line/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">ADD LOCAITON</span>
              </Button>
            </Link>
          </div>
        </div>
        <Lines lines={lines} />
      </div>
    </>
  );
}
