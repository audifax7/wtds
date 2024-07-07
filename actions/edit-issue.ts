"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { EditIssueSchema } from "@/schemas";

export const editIssue = async (
  values: z.infer<typeof EditIssueSchema>
) => {
  const validatedFields = EditIssueSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id, response } = validatedFields.data;

  await db.issue.update({
    where: {
      id,
    },
    data: {
      response,
    },
  });

  return { success: "Customer issue response submitted Successfully!" };
};
