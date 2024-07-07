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

  await db.treatment.update({
    where: {
      id,
    },
    data: {
      approved: true,
    },
  });

  return { success: "Treatement decision submitted Successfully!" };
};
