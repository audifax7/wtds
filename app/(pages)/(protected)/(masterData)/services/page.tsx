import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Services } from "./components/services";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "SERVICES",
};

export default async function ServiceAccountPage() {
  const services: any = await db.service.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            CUSTOMER SERVICES
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/services/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add service</span>
              </Button>
            </Link>
          </div>
        </div>
        <Services services={services} />
      </div>
    </>
  );
}
