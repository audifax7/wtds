"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddCellSchema } from "@/schemas";

export const addCell = async (values: z.infer<typeof AddCellSchema>) => {
  const validatedFields = AddCellSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, sectorId } = validatedFields.data;

  await db.cell.create({
    data: {
      name,
      sectorId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
