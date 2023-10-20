import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  id: z.number(),
  orderDate: z.string(),
  totalPrice: z.string().nullish(),
  paymentMethod: z.string().nullish(),
  status: z.boolean(),
  user: z.any(),
})

export type Order = z.infer<typeof orderSchema>