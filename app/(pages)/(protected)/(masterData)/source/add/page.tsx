import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { WaterSourceForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD WATER SOURCE",
};

export default async function AddVillagePage() {
  const districts = await db.district.findMany();
  const provinces = await db.province.findMany();
  const sectors = await db.sector.findMany();
  const cells = await db.cell.findMany();
  const villages = await db.village.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW WATER SOURCE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new water source
          </p>
        </div>
        <Separator />
        <WaterSourceForm
          districts={districts}
          provinces={provinces}
          sectors={sectors}
          cells={cells}
          villages={villages}
        />
      </div>
    </>
  );
}
