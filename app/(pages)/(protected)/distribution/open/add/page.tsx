import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
// import { OpenDistributionLineForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "ADD DISTRIBUTION",
};

export default async function OpenDistributionLinePage() {
  const lines = await db.line.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">OPEN DISTRIBUTION LINE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register open distribution line.
          </p>
        </div>
        <Separator />
        {/* <OpenDistributionLineForm lines={lines} /> */}
      </div>
    </>
  );
}
