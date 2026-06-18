/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from "mongoose";
import { Gender, Relationship_Status, User_Status } from "../../utilities/constant";
import { TAddress, TName } from "../user/user.interface";


export type TMember = {
  user: Types.ObjectId
  email: string;
  name: TName;
  bio?: string;
  profilePicture?: string;
  coverPhoto?: string;
  gender?: keyof typeof Gender;
  birthDate?: Date;
  phone?: string;
  work?: string[];
  education?: string[];
  location?: string;
  relationshipStatus?: keyof typeof Relationship_Status;
  status: keyof typeof User_Status;
  address?: TAddress;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  blockedUsers?: Types.ObjectId[];
  isOnline?: boolean;
  lastSeen?: Date;
  posts?: Types.ObjectId[];
  pages?: Types.ObjectId[];
  groupes?: Types.ObjectId[];
  category?: string[];
  hobbies?: string[];
  interests?: string[];
  travelInformation?: string;
  isVerified: boolean;
  isVerifiedBadge?: boolean;
  stripeCustomerId?: string;
  isDeleted: boolean;
}

export interface MemberModel extends Model<TMember> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TMember>;
}


