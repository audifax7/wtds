"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { EditChemicalsSchema } from "@/schemas";

export const editChemical = async (
  values: z.infer<typeof EditChemicalsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const existingChemical = await db.chemical.findUnique({
    where: {
      id: values.id,
    },
  });

  if (values.name) {
    const existingChemicalName = await db.chemical.findUnique({
      where: {
        name: values.name,
      },
    });

    if (
      existingChemicalName &&
      existingChemical &&
      existingChemicalName.id !== existingChemical.id
    ) {
      return { error: "Chemical name already in use!" };
    }
  }

  const updatedChemical = await db.chemical.update({
    where: { id: values.id },
    data: {
      ...values,
    },
  });

  return { success: "Chemical Updated successful!" };
};
