import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Issues } from "./components/issues";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Feedbacks } from "../../client/feedbacks/components/feedbacks";

export const metadata: Metadata = {
  title: "FEEDBACKS",
};

export default async function IssuesPage() {
  const user = await currentUser();
  const feedbacks: any = await db.feedback.findMany({
    include: {
      user: true,
    },
  });
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            CUSTOMER FEEDBACK
          </h2>
        </div>
        <Feedbacks feedbacks={feedbacks} />
      </div>
    </>
  );
}
