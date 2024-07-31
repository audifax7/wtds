import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { InventoryForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD INVENTORY",
};

export default async function AddInventoryPage() {
  const chemicals = await db.chemical.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW INVENTORY</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new inventory.
          </p>
        </div>
        <Separator />
        <InventoryForm chemicals={chemicals} />
      </div>
    </>
  );
}
