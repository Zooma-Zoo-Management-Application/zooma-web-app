import * as z from 'zod';

export const ProfileValidation = z.object({
  fullname: z.string()
  .min(3, {message: 'Name must be at least 3 characters.'})
  .max(30, {message: 'Name must be max 30 characters'}),
  username: z.string()
  .min(3, {message: 'Username must be at least 3 characters.'})
  .max(30, {message: 'Username must be max 30 characters'}),
  email: z.string().email({message: 'Please enter a valid email address.'}),
  gender: z.string().nonempty(),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  avatarUrl: z.string().url().nonempty(),
  phoneNumber: z.string(),
  // roleId: z.string().nonempty(),
});
