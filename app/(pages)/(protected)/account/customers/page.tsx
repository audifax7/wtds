import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { CustomerAccount } from "./components/customers";

export const metadata: Metadata = {
  title: "CUSTOMERS",
};

export default async function CustomersAccountPage() {
  const customers: any = await db.user.findMany({
    where: {
      role: UserRole.CUSTOMER,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Customers account
          </h2>
         
        </div>
        <CustomerAccount customers={customers} />
      </div>
    </>
  );
}
