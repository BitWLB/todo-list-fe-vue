import * as z from 'zod'

export const todoFormSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(5, { message: 'Title must be at least 5 characters.' })
    .max(20, { message: 'Title must not be longer than 20 characters.' }),
  priority: z
    .union([z.string({ required_error: 'Priority is required' }), z.number()])
    .refine(val => !isNaN(Number(val)), {
      message: 'Priority must be a valid number.',
    })
    .transform(val => Number(val)),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be at least 10 characters.' })
    .max(150, {
      message: 'Description must not be longer than 150 characters.',
    }),
})
