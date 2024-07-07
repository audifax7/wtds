"use server";

import * as z from "zod";

import { AddChemicalSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addChemical = async (
  values: z.infer<typeof AddChemicalSchema>
) => {
  const validatedFields = AddChemicalSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name } = validatedFields.data;

  const existingChemical = await db.chemical.findUnique({
    where: {
      name,
    },
  });

  if (existingChemical) {
    return { error: "Chemical name already exists." };
  }

  await db.chemical.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
