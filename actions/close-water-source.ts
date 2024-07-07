"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CloseWaterSourceSchema } from "@/schemas";

export const closeWaterSource = async (
  values: z.infer<typeof CloseWaterSourceSchema>
) => {
  const validatedFields = CloseWaterSourceSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id, quantity } = validatedFields.data;

  await db.sourceAction.update({
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

  return { success: "water closed Successfully!" };
};
