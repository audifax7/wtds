"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { EditTreatementSchema } from "@/schemas";

export const editTreatement = async (
  values: z.infer<typeof EditTreatementSchema>
) => {
  const validatedFields = EditTreatementSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }
  const {
    id,
    rsbRecommandation,
    rsbStatus,
    TreatedWaterTurbidityAverage,
    approved,
    chemicalId,
    domesticWaterUsed,
    dosage,
    outCome,
    parameter,
    rowWater,
    rowWaterQuality,
    rowWaterTurbidityAverage,
    stage,
    supRecommandation,
    supStatus,
    treateWaterQuality,
    treatedWater,
    treatementObjective,
  } = validatedFields.data;
  await db.treatment.update({
    where: {
      id,
    },
    data: {
      rsbRecommandation,
      rsbStatus,
      TreatedWaterTurbidityAverage,
      approved,
      chemicalId,
      domesticWaterUsed,
      dosage,
      outCome,
      parameter,
      rowWater,
      rowWaterQuality,
      rowWaterTurbidityAverage,
      stage,
      supRecommandation,
      supStatus,
      treateWaterQuality,
      treatedWater,
      treatementObjective,
    },
  });

  return { success: "Treatement decision submitted Successfully!" };
};
