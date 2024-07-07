import { Metadata } from "next";
import { db } from "@/lib/db";
import { Treatements } from "../../laboratory/treatement/components/treatements";

export const metadata: Metadata = {
  title: "WATER TREATEMENT",
};

export default async function CustomersAccountPage() {
  const treatements: any = await db.treatment.findMany({
    where: {
      approved: true,
    },
    include: {
      chemical: true,
    },
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            WATER TREATEMENTS FROM WASAC
          </h2>
        </div>
        <Treatements treatements={treatements} />
      </div>
    </>
  );
}
