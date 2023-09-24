import * as z from 'zod';

export const PasswordValidation = z.object({
  currentPassword: z.string({
    required_error: "Current Password is required",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  })
  .min(3, {message: 'New Password must be at least 6 characters.'})
  .max(30, {message: 'New Password must be max 30 characters'}),
  confirmNewPassword: z.string({}),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Oops! New Password doesnt match",
})