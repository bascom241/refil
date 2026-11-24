import { z } from "zod";
import { LocationType } from "./location.types.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const AddressSchema = z.object({
   

    label: z.enum(["Home", "Work", "Other"]).default("Home"),

    street: z.string().min(1, "Street is required").trim(),

    city: z.string().min(1, "City is required").trim(),

    state: z.string().min(1, "State is required").trim(),

    country: z.string().min(1, "Country is required").trim(),

    additionalInfo: z.string().trim().optional().default(""),

    location: z.object({
        type: z.enum(LocationType, {
            error: () => {
                return {
                    message: "invalid Location Type specified"
                }
            }
        }),
        coordinates: z
            .array(z.number())
            .length(2, "Coordinates must contain exactly [longitude, latitude]"),
    }),

    isDefault: z.boolean().default(false),
});

export type AddressDto = z.infer<typeof AddressSchema>;