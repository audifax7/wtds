import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { TreatementEditForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "MAKE DECISION",
};

interface TreatementIdPageProps {
  params: {
    treatementId: string;
  };
}
export default async function AddStaffPage({ params }: TreatementIdPageProps) {
  const treatement: any = await db.treatment.findUnique({
    where: {
      id: params.treatementId,
    },
  });
  const chemicals = await db.chemical.findMany();


  
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">MAKE CHANGE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to make change.
          </p>
        </div>
        <Separator />
        <TreatementEditForm chemicals={chemicals} treatement={treatement} />
      </div>
    </>
  );
}
