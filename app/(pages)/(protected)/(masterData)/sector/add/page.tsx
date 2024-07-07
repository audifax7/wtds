import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { SectorForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD SECTOR",
};

export default async function AddSectorPage() {
  const districts = await db.district.findMany();
  const provinces = await db.province.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW SECTOR</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new issue.
          </p>
        </div>
        <Separator />
        <SectorForm districts={districts} provinces={provinces} />
      </div>
    </>
  );
}
