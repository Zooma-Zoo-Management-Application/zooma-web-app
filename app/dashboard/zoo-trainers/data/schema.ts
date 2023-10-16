import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
  password: z.string().nullish(),
  email: z.string().email().nullish(),
  fullName: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  gender: z.string().nullish(),
  dateOfBirth: z.string().nullish(),
  avatarUrl: z.string().nullish(),
  status: z.boolean().nullish(),
  roleId: z.number().nullish(),
})

export type User = z.infer<typeof userSchema>