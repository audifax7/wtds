"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { EditServicesSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const editService = async (
  values: z.infer<typeof EditServicesSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const existingService = await db.service.findUnique({
    where: {
      id: values.id,
    },
  });

  if (values.name) {
    const existingServiceName = await db.service.findUnique({
      where: {
        name: values.name,
      },
    });

    if (
      existingServiceName &&
      existingService &&
      existingServiceName.id !== existingService.id
    ) {
      return { error: "Service name already in use!" };
    }
  }

  const updatedUser = await db.service.update({
    where: { id: values.id },
    data: {
      ...values,
    },
  });

  return { success: "Service Updated successful!" };
};
