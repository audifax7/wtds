import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { TreatementFeedbackForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "SHARE RECOMMANDATION",
};

interface TreatementIdPageProps {
  params: {
    treatementId: string;
  };
}
export default async function AddTreatementPage({
  params,
}: TreatementIdPageProps) {
  const treatement: any = await db.treatment.findUnique({
    where: {
      id: params.treatementId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">staff account</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register staff account.
          </p>
        </div>
        <Separator />
        <TreatementFeedbackForm treatement={treatement} />
      </div>
    </>
  );
}
