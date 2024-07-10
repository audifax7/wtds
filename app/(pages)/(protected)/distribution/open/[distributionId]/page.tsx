import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { CloseDistributionLineForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "CLOSE DISTRIBUTION LINE",
};

interface DistributionIdPageProps {
  params: {
    distributionId: string;
  };
}
export default async function CloseDistributionLinePage({
  params,
}: DistributionIdPageProps) {
  const distribution: any = await db.distribution.findUnique({
    where: {
      id: params.distributionId,
    },
  });

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">CLOSE DISTRIBUTION LINE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register close distribution line.
          </p>
        </div>
        <Separator />
        <CloseDistributionLineForm distribution={distribution} />
      </div>
    </>
  );
}
