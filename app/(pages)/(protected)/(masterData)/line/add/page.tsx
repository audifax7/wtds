import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { LineForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD LINE",
};

export default function AddServicePage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">WASAC LINE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new line.
          </p>
        </div>
        <Separator />
        <LineForm />
      </div>
    </>
  );
}
