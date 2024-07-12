import * as z from "zod";
import { UserRole } from "@prisma/client";

interface UserData {
  password?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const passwordRequired = (
  data: UserData,
  passwordField: keyof UserData,
  newPasswordField: keyof UserData,
  newPasswordConfirmationField: keyof UserData = "newPasswordConfirmation"
) => {
  const newPasswordEntered = data[newPasswordField] !== undefined;
  const confirmationEntered = data[newPasswordConfirmationField] !== undefined;

  if (newPasswordEntered && !confirmationEntered) {
    return false;
  }

  return !(
    (data[passwordField] && !data[newPasswordField]) ||
    (data[newPasswordField] && !data[passwordField])
  );
};

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  id: z.string(),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.DISTRIBUTOR,
    UserRole.LABORATOR,
    UserRole.SOURCE,
    UserRole.SUPERVISOR,
  ]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(1)),
  newPassword: z.optional(
    z.string().min(6, {
      message:
        "Please enter a new password with at least 6 characters, required",
    })
  ),
  newPasswordConfirmation: z.optional(
    z.string().min(6, {
      message:
        "Please confirm your password with at least 6 characters, required",
    })
  ),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Please enter your password, required",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Please confirm your password, required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address, required.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address. Email is required.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password. Password is required.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name, required.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address, required.",
    }),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.CUSTOMER,
      UserRole.DISTRIBUTOR,
      UserRole.LABORATOR,
      UserRole.SOURCE,
      UserRole.SUPERVISOR,
      UserRole.RSB,
    ]),
    password: z.string().min(6, {
      message: "Please enter a password with at least 6 characters, required",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Please confirm your password, required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const AddServiceSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
});

export const AddLineSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
});

export const AddTreatementSchema = z.object({
  rowWater: z.number(),
  rowWaterTurbidityAverage: z.number(),
  treatedWater: z.number(),
  TreatedWaterTurbidityAverage: z.number(),
  chemicalId: z.string().min(1, {
    message: "Please select chemical, required.",
  }),
  domesticWaterUsed: z.string().min(1, {
    message: "Please enter your domesticWaterUsed, required.",
  }),
});

export const EditTreatementSchema = z.object({
  id: z.string(),
  rowWater: z.optional(z.number()),
  rowWaterTurbidityAverage: z.optional(z.number()),
  treatedWater: z.optional(z.number()),
  TreatedWaterTurbidityAverage: z.optional(z.number()),
  chemicalId: z.optional(
    z.string().min(1, {
      message: "Please select chemical, required.",
    })
  ),
  domesticWaterUsed: z.optional(
    z.string().min(1, {
      message: "Please enter your domesticWaterUsed, required.",
    })
  ),
  rsbRecommandation: z.optional(
    z.string().min(1, {
      message: "Please enter your domesticWaterUsed, required.",
    })
  ),
  approved: z.optional(z.boolean()),
});

export const EditServicesSchema = z.object({
  name: z.optional(z.string()),
  id: z.string(),
});

export const EditIssueSchema = z.object({
  response: z.optional(z.string()),
  id: z.string(),
});

export const EditSourceSchema = z.object({
  name: z.optional(z.string()),
  id: z.string(),
});

export const AddChemicalSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
});

export const AddWaterSourceSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
  provinceId: z.optional(z.string()),
  districtId: z.optional(z.string()),
  sectorId: z.optional(z.string()),
  cellId: z.optional(z.string()),
  villageId: z.string().min(1, {
    message: "Please select village, required.",
  }),
});

export const AddProvinceSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
});

export const AddDistrictSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
  provinceId: z.string().min(1, {
    message: "Please select province, required.",
  }),
});

export const AddSectorSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
  provinceId: z.optional(z.string()),
  districtId: z.string().min(1, {
    message: "Please select district, required.",
  }),
});

export const AddCellSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
  provinceId: z.optional(z.string()),
  districtId: z.optional(z.string()),
  sectorId: z.string().min(1, {
    message: "Please select sector, required.",
  }),
});

export const AddVillageSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name, required.",
  }),
  provinceId: z.optional(z.string()),
  districtId: z.optional(z.string()),
  sectorId: z.optional(z.string()),
  cellId: z.string().min(1, {
    message: "Please select cell, required.",
  }),
});

export const OpenWaterSourceSchema = z.object({
  sourceId: z.string().min(1, {
    message: "Please select source, required.",
  }),
});

export const CloseWaterSourceSchema = z.object({
  id: z.string().min(1, {
    message: "Please select source id, required.",
  }),
  quantity: z.number(),
});

export const OpenDistributionLineSchema = z.object({
  id: z.string().min(1, {
    message: "Please select line, required.",
  }),
});

export const ScheduleDistributionLineSchema = z.object({
  lineId: z.string().min(1, {
    message: "Please select line id, required.",
  }),
  quantity: z.number(),
  scheduleDate:  z.date({
    required_error: "A schedule date is required.",
  }),
});

export const CloseDistributionLineSchema = z.object({
  id: z.string().min(1, {
    message: "Please select line id, required.",
  }),
});

export const DistributionLineCommentSchema = z.object({
  id: z.string().min(1, {
    message: "Please select line id, required.",
  }),
  comment: z.string().min(1, {
    message: "Please enter comment, required.",
  }),
});

export const AddIssueSchema = z.object({
  content: z.string().min(1, {
    message: "Please enter your content, required.",
  }),
  serviceId: z.string().min(1, {
    message: "Please select service, required.",
  }),
});

export const AddRegulationSchema = z.object({
  content: z.string().min(1, {
    message: "Please enter your content, required.",
  }),
});

export const AddFeedbackSchema = z.object({
  content: z.string().min(1, {
    message: "Please enter your content, required.",
  }),
});

export const EditChemicalsSchema = z.object({
  name: z.optional(z.string()),
  id: z.string(),
});
