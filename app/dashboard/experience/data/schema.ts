import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dietSchema = z.object({
  id: z.number(),
  description: z.string().nullish(),
  yearOfExperience: z.number().nullish(),
  status: z.boolean(),
  userId: z.number(),
  skillId: z.number(),
  skill: z.string().array()
})

export type Diet = z.infer<typeof dietSchema>