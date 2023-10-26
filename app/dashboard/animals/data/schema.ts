import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const animalSchema = z.object({
  id: z.number(),
  name: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string(),
  height: z.number(),
  weight: z.number(),
  description: z.string(),
  speciesId: z.number(),
  dietId: z.number(),
  cageId: z.number(),

})

export type Animal = z.infer<typeof animalSchema>
