import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const AnimalSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  content: z.string().nullish(),
  date: z.string().nullish(),
  image: z.string().nullish(),
  status: z.boolean(),
  userId: z.number().nullish(),
})

export type Animal = z.infer<typeof AnimalSchema>