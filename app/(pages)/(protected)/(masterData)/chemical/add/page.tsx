import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ChemicalForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD CHEMICAL",
};

export default function AddChemicalPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD CHEMICAL</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new chemical.
          </p>
        </div>
        <Separator />
        <ChemicalForm />
      </div>
    </>
  );
}
