import { z } from "zod";
import { UserRole } from "./UserRole.type.js";
import { AddressSchema } from "../../address/types/LocationRequest.types.js";

export const RegisterRequestSchema = z.object({
  firstName: z.string().min(2, "FirstName is too short").trim(),
  lastName: z.string().min(2, "LastName is too short").trim(), 
  phoneNumber: z.string().min(11, "Phone Number is invalid").trim(), 
 
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(UserRole, {
    error: () => {
      return {
        message: "invalid role specified"
      }
    }
  }).optional(), 

});

export type RegisterRequestDto = z.infer<typeof RegisterRequestSchema>;