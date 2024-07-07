import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { OpenWaterSourceForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Add STAFF",
};

export default async function OpenWaterSourcePage() {
  const sources = await db.source.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">OPEN WATER SOURCE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register open water source.
          </p>
        </div>
        <Separator />
        <OpenWaterSourceForm sources={sources} />
      </div>
    </>
  );
}
