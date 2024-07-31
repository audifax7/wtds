"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { AddInventorySchema } from "@/schemas";

export const addInventory = async (
  values: z.infer<typeof AddInventorySchema>
) => {
  const validatedFields = AddInventorySchema.safeParse(values);

  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const {
   chemicalId,quantity
  } = validatedFields.data;

  const existChemical= await db.inventory.findFirst({
    where:{
      chemicalId
    }
  })

  if(existChemical){
    await db.inventory.update({
      where:{
        id:existChemical.id
      },
      data:{
        quantity:quantity+ existChemical.quantity
      }
    })
  }else{
    await db.inventory.create({
      data: {
        userId: user.id,
        chemicalId,
        quantity
      },
    });
  }



  return { success: "Add inventory Successfully!" };
};
