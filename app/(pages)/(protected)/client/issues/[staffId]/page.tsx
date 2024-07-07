import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { StaffAccountEditForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit STAFF",
};

interface StaffIdPageProps {
  params: {
    staffId: string;
  };
}
export default async function AddStaffPage({ params }: StaffIdPageProps) {
  const staff: any = await db.user.findUnique({
    where: {
      id: params.staffId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">staff account</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register staff account.
          </p>
        </div>
        <Separator />
        <StaffAccountEditForm staff={staff} />
      </div>
    </>
  );
}
