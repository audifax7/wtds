"use server";

import * as z from "zod";

import { AddLineSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addLine = async (values: z.infer<typeof AddLineSchema>) => {
  const validatedFields = AddLineSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name } = validatedFields.data;

  const existingLine = await db.line.findUnique({
    where: {
      name,
    },
  });

  if (existingLine) {
    return { error: "Line name already exists." };
  }

  await db.line.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
