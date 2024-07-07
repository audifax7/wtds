import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ProvinceForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD PROVINCE",
};

export default function AddProvincePage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">PROVINCES</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new province.
          </p>
        </div>
        <Separator />
        <ProvinceForm />
      </div>
    </>
  );
}
