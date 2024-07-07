import { Metadata } from "next";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ClosedDistributionLine } from "./components/closed";

export const metadata: Metadata = {
  title: "CLOSED DISTRIBUTION LINE",
};

export default async function ClosedeDistributionLinePage() {
  const user = await currentUser();
  const closed: any = await db.distribution.findMany({
    where: {
      userId: user.id,
      isOpen: false,
    },
    include: {
      line: true,
      user: true,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between space-y-2 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">
          CLOSED DISTRIBUTION LINE
        </h2>
      </div>
      <ClosedDistributionLine closed={closed} />
    </>
  );
}
