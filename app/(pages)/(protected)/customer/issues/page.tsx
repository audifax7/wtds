import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Issues } from "./components/issues";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ISSUES",
};

export default async function IssuesPage() {
  const user = await currentUser();
  const issues: any = await db.issue.findMany({
    include: {
      service: true,
      customer:true
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">CUSTOMER ISSUES</h2>
        </div>
        <Issues issues={issues} />
      </div>
    </>
  );
}
