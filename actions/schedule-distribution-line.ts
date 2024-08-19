"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ScheduleDistributionLineSchema } from "@/schemas";

export const scheduleDistributionLine = async (
  values: z.infer<typeof ScheduleDistributionLineSchema>
) => {
  const validatedFields = ScheduleDistributionLineSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { lineId,quantity,scheduleDate } = validatedFields.data;

  await db.distribution.create({
    data: {
      quantity,
      lineId,
      scheduleDate,
      userId: user.id,
    },
  });

  return { success: "Distribution line scheduled Successfully!" };
};
