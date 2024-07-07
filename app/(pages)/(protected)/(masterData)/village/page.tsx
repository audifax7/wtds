import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Villages } from "./components/villages";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "VILLAGES",
};

export default async function VillagessPage() {
  const user = await currentUser();
  const villages: any = await db.village.findMany({
    include: {
      user: true,
      cell: {
        include: {
          sector: {
            include: {
              district: {
                include: {
                  province: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">VILLAGES LIST</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/village/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add village</span>
              </Button>
            </Link>
          </div>
        </div>
        <Villages villages={villages} />
      </div>
    </>
  );
}
