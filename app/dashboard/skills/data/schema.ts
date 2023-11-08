import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dietSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  status: z.boolean(),
})

export type Diet = z.infer<typeof dietSchema>