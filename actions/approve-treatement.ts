"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { EditTreatementSchema } from "@/schemas";

export const approveTreatement = async (
  values: z.infer<typeof EditTreatementSchema>
) => {
  const validatedFields = EditTreatementSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id } = validatedFields.data;

  const treatment = await db.treatment.findUnique({
    where: {
      id,
    },
  });

  const inventory = await db.inventory.findFirst({
    where: {
      chemicalId: treatment?.chemicalId,
    },
  });

  if (inventory && treatment) {
    const usedQuantity = treatment.chemicalQuantity + inventory.usedQuantity;
    await db.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        usedQuantity,
      },
    });

    await db.treatment.update({
      where: {
        id,
      },
      data: {
        approved: true,
      },
    });

    return { success: "Treatement decision submitted Successfully!" };
  } else {
    return { error: "Chemical to be used is not exist!" };
  }
};
