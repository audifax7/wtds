import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ServiceForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD SERVICE",
};

export default function AddServicePage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">SERVICES</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new service.
          </p>
        </div>
        <Separator />
        <ServiceForm />
      </div>
    </>
  );
}
