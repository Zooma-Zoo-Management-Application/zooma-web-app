import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dietSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  createAt: z.date(),
  updateAt: z.date().nullish(),
  scheduleAt: z.date(),
  endAt: z.date(),
  feedingDate: z.array(z.string()),
  feedingTime: z.date(),
  quantity: z.number(),
  status: z.boolean(),
  FoodId: z.number()
})

export type Diet = z.infer<typeof dietSchema>