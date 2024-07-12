import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ScheduleDistributionLineForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "ADD DISTRIBUTION",
};

export default async function ScheduleDistributionLinePage() {
  const lines = await db.line.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">SCHEDULE DISTRIBUTION LINE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register schedule distribution line.
          </p>
        </div>
        <Separator />
        <ScheduleDistributionLineForm lines={lines} />
      </div>
    </>
  );
}
