import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import {  EditEquipmentForm } from "./components/form";

export const metadata: Metadata = {
  title: "CHANGE EQUIPMENT STATUS",
};

interface EditEqupmentPageProps {
  params: {
    equipmentId: string;
  };
}
export default async function EditEquipmentPage({
  params,
}: EditEqupmentPageProps) {
  const equipment: any = await db.equipment.findUnique({
    where: {
      id: params.equipmentId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">CHANGE EQUIPMENT STATUS</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to change equipment status.
          </p>
        </div>
        <Separator />
        <EditEquipmentForm equipment={equipment} />
      </div>
    </>
  );
}
