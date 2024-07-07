"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddTreatementSchema } from "@/schemas";

export const addTreatement = async (
  values: z.infer<typeof AddTreatementSchema>
) => {
  const validatedFields = AddTreatementSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const {
    TreatedWaterTurbidityAverage,
    chemicalId,
    domesticWaterUsed,
    rowWater,
    rowWaterTurbidityAverage,
    treatedWater,
  } = validatedFields.data;

  await db.treatment.create({
    data: {
      domesticWaterUsed,
      userId: user.id,
      chemicalId,
      rowWater,
      rowWaterTurbidityAverage,
      treatedWater,
      TreatedWaterTurbidityAverage,
    },
  });

  return { success: "Successfully registered!" };
};
