import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { RespondToCustomerIssueForm } from "./components/form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "RESPOND TO ISSUE",
};

interface IssueIdPageProps {
  params: {
    issueId: string;
  };
}
export default async function RespondIssuePage({ params }: IssueIdPageProps) {
  const issue: any = await db.issue.findUnique({
    where: {
      id: params.issueId,
    },
  });
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">RESPOND TO CUSTOMER ISSUE</h3>
        </div>
        <Separator />
        <RespondToCustomerIssueForm issue={issue} />
      </div>
    </>
  );
}
