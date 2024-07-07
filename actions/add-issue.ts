"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddIssueSchema } from "@/schemas";

export const addIssue = async (values: z.infer<typeof AddIssueSchema>) => {
  const validatedFields = AddIssueSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { content, serviceId } = validatedFields.data;

  await db.issue.create({
    data: {
      content,
      customerId: user.id,
      serviceId: serviceId,
    },
  });

  return { success: "Successfully registered!" };
};
