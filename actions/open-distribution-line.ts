"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { OpenDistributionLineSchema } from "@/schemas";

export const openDistributionLine = async (
  values: z.infer<typeof OpenDistributionLineSchema>
) => {
  const validatedFields = OpenDistributionLineSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { lineId } = validatedFields.data;

  await db.distribution.create({
    data: {
      isOpen: true,
      openTime: new Date(),
      lineId,
      userId: user.id,
    },
  });

  return { success: "Distribution line opened Successfully!" };
};
