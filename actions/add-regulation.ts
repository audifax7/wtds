"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddRegulationSchema } from "@/schemas";

export const addRegulation = async (
  values: z.infer<typeof AddRegulationSchema>
) => {
  const validatedFields = AddRegulationSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { content } = validatedFields.data;

  await db.regulation.create({
    data: {
      content,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
