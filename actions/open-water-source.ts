"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { OpenWaterSourceSchema } from "@/schemas";

export const openWaterSource = async (
  values: z.infer<typeof OpenWaterSourceSchema>
) => {
  const validatedFields = OpenWaterSourceSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { sourceId } = validatedFields.data;

  await db.sourceAction.create({
    data: {
      isOpen: true,
      openTime: new Date(),
      sourceId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
