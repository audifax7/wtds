"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddSectorSchema } from "@/schemas";

export const addSector = async (values: z.infer<typeof AddSectorSchema>) => {
  const validatedFields = AddSectorSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, districtId } = validatedFields.data;

  await db.sector.create({
    data: {
      name,
      districtId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
