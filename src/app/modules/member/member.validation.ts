import { z } from "zod";
import { Gender, Relationship_Status, User_Status } from "../../utilities/constant";

const nameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const addressValidationSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string(),
});

export const createMemberValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    member: z.object({
      email: z.string().email(),
      name: nameValidationSchema,
      bio: z.string().optional(),
      profilePicture: z.string().optional(),
      coverPhoto: z.string().optional(),
      gender: z.enum(Object.values(Gender) as [string, ...string[]]).optional(),
      birthDate: z.string().pipe(z.coerce.date()).optional(),
      phone: z.string().optional(),
      work: z.string().optional(),
      education: z.string().optional(),
      location: z.string().optional(),
      relationshipStatus: z.enum(Object.values(Relationship_Status) as [string, ...string[]]).optional(),
      status: z.enum(Object.values(User_Status) as [string, ...string[]]).optional(),
      address: addressValidationSchema.optional(),
      isVerified: z.boolean().optional(),
      isVerifiedBadge: z.boolean().optional(),
      stripeCustomerId: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const updateMemberValidationSchema = z.object({
  body: z.object({
    member: z.object({
      name: z.object({
        firstName: z.string().min(1).max(20).optional(),
        middleName: z.string().optional(),
        lastName: z.string().min(1).optional(),
      }).optional(),
      bio: z.string().optional(),
      profilePicture: z.string().optional(),
      coverPhoto: z.string().optional(),
      gender: z.enum(Object.values(Gender) as [string, ...string[]]).optional(),
      birthDate: z.string().pipe(z.coerce.date()).optional(),
      phone: z.string().optional(),
      work: z.string().optional(),
      education: z.string().optional(),
      location: z.string().optional(),
      relationshipStatus: z.enum(Object.values(Relationship_Status) as [string, ...string[]]).optional(),
      status: z.enum(Object.values(User_Status) as [string, ...string[]]).optional(),
      address: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
      }).optional(),
      isVerified: z.boolean().optional(),
      isVerifiedBadge: z.boolean().optional(),
      stripeCustomerId: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }).optional(),
  }),
});

export const MemberValidations = {
  createMemberValidationSchema,
  updateMemberValidationSchema,
};
