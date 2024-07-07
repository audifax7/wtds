import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { DistrictForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD DISTRICT",
};

export default async function AddDistrictPage() {
  const provinces = await db.province.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW DISTRICT</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new issue.
          </p>
        </div>
        <Separator />
        <DistrictForm provinces={provinces} />
      </div>
    </>
  );
}
