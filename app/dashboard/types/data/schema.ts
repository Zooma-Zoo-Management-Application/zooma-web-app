import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const typeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  imageUrl: z.string().nullish(),
  status: z.boolean().nullish(),
})

export type Types = z.infer<typeof typeSchema>
