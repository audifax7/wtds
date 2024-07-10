import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { TreatementForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD TREATEMENT",
};

export default async function AddTreatementPage() {
  const chemicals = await db.chemical.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW TREATEMENT</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new treatement.
          </p>
        </div>
        <Separator />
        <TreatementForm chemicals={chemicals} />
      </div>
    </>
  );
}
