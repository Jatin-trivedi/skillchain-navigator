import { z } from "zod";

// Password strength checker
export const getPasswordStrength = (password: string): { level: "weak" | "medium" | "strong"; message: string } => {
  if (password.length < 8) {
    return { level: "weak", message: "Too short" };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 3) return { level: "weak", message: "Weak" };
  if (score <= 5) return { level: "medium", message: "Medium" };
  return { level: "strong", message: "Strong" };
};

// Student signup schema
export const studentSignupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Issuer signup schema
export const issuerSignupSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name must be less than 100 characters"),
  organizationUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.string().length(0))
    .optional(),
  organizationType: z.enum(["university", "company", "certification"], {
    errorMap: () => ({ message: "Please select an organization type" }),
  }),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  recipientsPerYear: z.enum(["<100", "100-1000", "1000-5000", "5000+"], {
    errorMap: () => ({ message: "Please select recipients per year" }),
  }),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type StudentSignupForm = z.infer<typeof studentSignupSchema>;
export type IssuerSignupForm = z.infer<typeof issuerSignupSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
