import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Rules } from "./components/rules";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "RULES AND REGULATION",
};

export default async function RulesPage() {
  const rules: any = await db.regulation.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            RSB RULES AND REGULATION
          </h2>
          <div className="flex items-center space-x-2">
            <Link href={"/regulation/rules/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">ADD RULES</span>
              </Button>
            </Link>
          </div>
        </div>
        <Rules rules={rules} />
      </div>
    </>
  );
}
