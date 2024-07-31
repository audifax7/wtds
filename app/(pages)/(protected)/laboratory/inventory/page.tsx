import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Inventories } from "./components/inventorories";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import moment from "moment";

export const metadata: Metadata = {
  title: "CHEMICAL INVENTORY",
};

export default async function InventorysPage() {
  const user = await currentUser();
  const inventories: any = await db.inventory.findMany({
    include: {
      chemical: true,
      user: true
    },
  });

  const isSupervisor = user.role === UserRole.SUPERVISOR;

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight"></h2>Kimisagara WTP Inventory| Date { moment().format('LL')} | Time {moment().format('LTS')} | Techinicain : {user.name}
          <div className="flex items-center space-x-2">
            {isSupervisor ?
              <Link href={"/laboratory/inventory/add"}>
                <Button>
                  <PlusCircle />
                  <span className="pl-2">ADD INVENTORY</span>
                </Button>
              </Link> :
              null
            }

          </div>
        </div>
        <Inventories user={user} inventories={inventories} />
      </div>
    </>
  );
}
