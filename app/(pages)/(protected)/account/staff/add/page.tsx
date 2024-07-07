import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { StaffAccountForm } from "./components/form";

export const metadata: Metadata = {
  title: "Add STAFF",
};

export default function AddStaffPage() {
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
        <StaffAccountForm />
      </div>
    </>
  );
}
