import { z } from 'zod';

const authValidation = z.object({
      body: z.object({
            email: z.string({
                  required_error: 'Email is required',
            }),
            password: z.string({
                  required_error: 'Password is required',
            }),
      }),
});

const registerValidation = z.object({
      body: z.object({
            firstName: z.string({
                  required_error: 'First name is required',
            }),
            lastName: z.string({
                  required_error: 'Last name is required',
            }),
            email: z.string({
                  required_error: 'Email is required',
            }),
            password: z.string({
                  required_error: 'Password is required',
            }),
            phoneNumber: z.string().optional(),
            homeAddress: z.string().optional(),
            city: z.string().optional(),
            region: z.string().optional(),
            companyName: z.string().optional(),
            location: z.string().optional(),
            role: z.enum(['owner', 'employer']).optional(),
      }),
});

export const authValidationSchema = {
      authValidation,
      registerValidation,
};
