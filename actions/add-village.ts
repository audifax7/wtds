"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddVillageSchema } from "@/schemas";

export const addVillage = async (values: z.infer<typeof AddVillageSchema>) => {
  const validatedFields = AddVillageSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, cellId } = validatedFields.data;

  await db.village.create({
    data: {
      name,
      cellId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
