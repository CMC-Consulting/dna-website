import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  employees: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});
