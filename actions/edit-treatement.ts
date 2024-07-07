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

  const { id, rsbRecommandation } = validatedFields.data;

  await db.treatment.update({
    where: {
      id,
    },
    data: {
      rsbRecommandation,
    },
  });

  return { success: "Treatement decision submitted Successfully!" };
};
