import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Feedbacks } from "./components/feedbacks";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "MY FEEDBACK",
};

export default async function feedbacksPage() {
  const user = await currentUser();
  const feedbacks: any = await db.feedback.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            LIST OF MY FEEDBACK
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/client/feedbacks/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">ADD FEEDBACK</span>
              </Button>
            </Link>
          </div>
        </div>
        <Feedbacks feedbacks={feedbacks} />
      </div>
    </>
  );
}
