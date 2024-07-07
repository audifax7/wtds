import { Metadata } from "next";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ClosedWaterSource } from "./components/closed";

export const metadata: Metadata = {
  title: "CLOSED WATER SOURCE",
};

export default async function ClosedeWaterSourcePage() {
  const user = await currentUser();
  const closed: any = await db.sourceAction.findMany({
    where: {
      userId: user.id,
      isOpen: false,
    },
    include: {
      source: true,
      user: true,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between space-y-2 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">
          CLOSED WATER SOURCE
        </h2>
      </div>
      <ClosedWaterSource closed={closed} />
    </>
  );
}
