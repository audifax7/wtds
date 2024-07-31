"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { EditEquipmentSchema } from "@/schemas";

export const editEquipment = async (
  values: z.infer<typeof EditEquipmentSchema>
) => {
  const user = await currentUser();

  const { id, status } = values;

  if (!user) {
    return { error: "Unauthorized" };
  }

  const updatedEquipment = await db.equipment.update({
    where: { id: values.id },
    data: {
      status,
    },
  });

  return { success: "Equipment status changed successful!" };
};
