import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { IssueForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD ISSUE",
};

export default async function AddIssuePage() {
  const services = await db.service.findMany();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD NEW ISSUE</h3>
          <p className="text-sm text-muted-foreground">
            Fill this form to register new issue.
          </p>
        </div>
        <Separator />
        <IssueForm services={services} />
      </div>
    </>
  );
}
