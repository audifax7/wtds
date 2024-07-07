"use server";

import * as z from "zod";

import { AddProvinceSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addProvince = async (
  values: z.infer<typeof AddProvinceSchema>
) => {
  const validatedFields = AddProvinceSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name } = validatedFields.data;

  const existingProvince = await db.province.findUnique({
    where: {
      name,
    },
  });

  if (existingProvince) {
    return { error: "Province name already exists." };
  }

  await db.province.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
