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

  const { id } = validatedFields.data;

  await db.distribution.update({
    where:{id},
    data: {
      isOpen: true,
      openTime: new Date(),
      userId: user.id,
    },
  });

  return { success: "Distribution line opened Successfully!" };
};
