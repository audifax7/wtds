import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import {  EquipmentForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD EQUIPMENT",
};

export default function AddEquipmentPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD EQUIPMENT</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new Equipment.
          </p>
        </div>
        <Separator />
        <EquipmentForm />
      </div>
    </>
  );
}
