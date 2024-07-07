"use server";

import * as z from "zod";

import { AddWaterSourceSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addWaterSource = async (
  values: z.infer<typeof AddWaterSourceSchema>
) => {
  const validatedFields = AddWaterSourceSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, villageId } = validatedFields.data;

  const existingWaterSource = await db.source.findUnique({
    where: {
      name,
    },
  });

  if (existingWaterSource) {
    return { error: "Water source name already exists." };
  }

  await db.source.create({
    data: {
      name,
      villageId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
