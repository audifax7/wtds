import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { EditChemicalForm } from "./components/form";

export const metadata: Metadata = {
  title: "EDIT CHEMICAL",
};

interface EditChemicalPageProps {
  params: {
    chemicalId: string;
  };
}
export default async function EditChemicalPage({
  params,
}: EditChemicalPageProps) {
  const chemical: any = await db.chemical.findUnique({
    where: {
      id: params.chemicalId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">EDIT CHEMICAL</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to edit chemical.
          </p>
        </div>
        <Separator />
        <EditChemicalForm chemical={chemical} />
      </div>
    </>
  );
}
