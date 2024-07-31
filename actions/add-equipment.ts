"use server";

import * as z from "zod";

import { AddEquipmentSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addEquipment = async (
  values: z.infer<typeof AddEquipmentSchema>
) => {
  const validatedFields = AddEquipmentSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name,status } = validatedFields.data;

  const existingEquipment = await db.equipment.findFirst({
    where: {
      name,
    },
  });

  if (existingEquipment) {
    return { error: "equiment name already exists." };
  }

  await db.equipment.create({
    data: {
      name,
      status,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
