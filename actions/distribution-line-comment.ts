"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { DistributionLineCommentSchema } from "@/schemas";

export const distributionLineComment = async (
  values: z.infer<typeof DistributionLineCommentSchema>
) => {
  const validatedFields = DistributionLineCommentSchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id,comment } = validatedFields.data;

  await db.distribution.update({
    where: {
      id,
    },
    data: {
      comment,
      userId: user.id,
    },
  });

  return { success: "Distribution line comment submitted Successfully!" };
};
