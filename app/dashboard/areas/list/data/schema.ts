import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const areaSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export type Area = z.infer<typeof areaSchema>
