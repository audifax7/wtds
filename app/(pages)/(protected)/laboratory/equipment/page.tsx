import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Equipments } from "./components/equipments";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "EQUIPMENT",
};

export default async function EquipmentPage() {
  const equipments: any = await db.equipment.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            KIMISAGRA Lab Equipment Status
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/laboratory/equipment/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add Equipment</span>
              </Button>
            </Link>
          </div>
        </div>
        <Equipments equipments={equipments} />
      </div>
    </>
  );
}
