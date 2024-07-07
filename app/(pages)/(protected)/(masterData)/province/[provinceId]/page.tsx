import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { EditServiceForm } from "./components/form";

export const metadata: Metadata = {
  title: "EDIT SERVICE",
};

interface EditServicePageProps {
  params: {
    serviceId: string;
  };
}
export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const service: any = await db.service.findUnique({
    where: {
      id: params.serviceId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">EDIT SERVICE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to edit service.
          </p>
        </div>
        <Separator />
        <EditServiceForm service={service} />
      </div>
    </>
  );
}
