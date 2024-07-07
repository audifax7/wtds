"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CloseDistributionLineSchema } from "@/schemas";

export const closeDistributionLine = async (
  values: z.infer<typeof CloseDistributionLineSchema>
) => {
  const validatedFields = CloseDistributionLineSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id, quantity } = validatedFields.data;

  await db.distribution.update({
    where: {
      id,
    },
    data: {
      isOpen: false,
      quantity,
      closeTime: new Date(),
      userId: user.id,
    },
  });

  return { success: "Distribution line closed Successfully!" };
};
