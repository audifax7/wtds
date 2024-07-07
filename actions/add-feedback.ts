"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddFeedbackSchema } from "@/schemas";

export const addFeedback = async (
  values: z.infer<typeof AddFeedbackSchema>
) => {
  const validatedFields = AddFeedbackSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { content } = validatedFields.data;

  await db.feedback.create({
    data: {
      content,
      userId: user.id,
    },
  });

  return { success: "Feedback submitte Successfully!" };
};
