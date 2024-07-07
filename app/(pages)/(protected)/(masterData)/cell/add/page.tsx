import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { CellForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD SECTOR",
};

export default async function AddSectorPage() {
  const districts = await db.district.findMany();
  const provinces = await db.province.findMany();
  const sectors = await db.sector.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW CELL</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new cell
          </p>
        </div>
        <Separator />
        <CellForm
          districts={districts}
          provinces={provinces}
          sectors={sectors}
        />
      </div>
    </>
  );
}
