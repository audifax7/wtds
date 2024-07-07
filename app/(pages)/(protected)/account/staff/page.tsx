import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StaffAccount } from "./components/staffs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "STAFF",
};

export default async function StaffAccountPage() {
  const staffs: any = await db.user.findMany({
    where: {
      NOT: {
        role: UserRole.CUSTOMER,
      },
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Staff account</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/account/staff/add"}>
              <Button>
                <PlusCircle />
                <span className="pl-2">Add staff</span>
              </Button>
            </Link>
          </div>
        </div>
        <StaffAccount staffs={staffs} />
      </div>
    </>
  );
}
