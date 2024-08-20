import { Metadata } from "next";
import { db } from "@/lib/db";
import { Treatements } from "../../laboratory/treatement/components/treatements";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "WATER TREATEMENT",
};

export default async function CustomersAccountPage() {

  const user= await currentUser()
  const treatements: any = await db.treatment.findMany({
    where: {
      // approved: true,
      supStatus:"Approve"
    },
    include: {
      chemical: true,
    },
    orderBy:{
      updatedAt:'desc'
    }
  });

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-y-2 pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            WATER TREATEMENTS FROM KIMISAGARA WTP
          </h2>
        </div>
        <Treatements user={user} treatements={treatements} />
      </div>
    </>
  );
}
