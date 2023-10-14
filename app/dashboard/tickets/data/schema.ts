import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const ticketSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number().nullish(),
})

export type Ticket = z.infer<typeof ticketSchema>