"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddDistrictSchema } from "@/schemas";

export const addDistrict = async (
  values: z.infer<typeof AddDistrictSchema>
) => {
  const validatedFields = AddDistrictSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, provinceId } = validatedFields.data;

  await db.district.create({
    data: {
      name,
      provinceId,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
