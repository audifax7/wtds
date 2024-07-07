import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Sources } from "./components/sources";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "WATER SOURCE",
};

export default async function SourcesPage() {
  const user = await currentUser();
  const sources: any = await db.source.findMany({
    include: {
      user: true,
      village: {
        include: {
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
      },
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            WATER SOURCE LIST
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/source/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add water source</span>
              </Button>
            </Link>
          </div>
        </div>
        <Sources sources={sources} />
      </div>
    </>
  );
}
