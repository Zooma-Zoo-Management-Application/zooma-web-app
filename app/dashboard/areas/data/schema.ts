import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const cageSchema = z.object({
  id: z.number(),
  name: z.string(),
  animalLimit: z.number().nullish(),
  animalCount: z.number().nullish(),
  description: z.string().nullish(),
  animal: z.any().nullish(),
  areaId: z.any().nullish(),
})

export type Cages = z.infer<typeof cageSchema>
