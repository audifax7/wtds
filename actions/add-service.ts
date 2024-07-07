"use server";

import * as z from "zod";

import { AddServiceSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const addService = async (values: z.infer<typeof AddServiceSchema>) => {
  const validatedFields = AddServiceSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name } = validatedFields.data;

  const existingService = await db.service.findUnique({
    where: {
      name,
    },
  });

  if (existingService) {
    return { error: "Service name already exists." };
  }

  await db.service.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return { success: "Successfully registered!" };
};
