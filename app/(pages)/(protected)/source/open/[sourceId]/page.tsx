import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { CloseWaterSourceForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "CLOSE WATER SOURCE",
};

interface SourceIdPageProps {
  params: {
    sourceId: string;
  };
}
export default async function CloseWaterSourcePage({
  params,
}: SourceIdPageProps) {
  const source: any = await db.sourceAction.findUnique({
    where: {
      id: params.sourceId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">CLOSE WATER SOURCE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register close water source.
          </p>
        </div>
        <Separator />
        <CloseWaterSourceForm source={source} />
      </div>
    </>
  );
}
