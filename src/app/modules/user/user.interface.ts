/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from "mongoose";
import { Gender, Relationship_Status, USER_ROLE } from "../../utilities/constant";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export type TUser = {
  email: string;
  password: string;
  name: TName;
  bio?: string;
  avatar?: string;
  cover?: string;
  gender?: keyof typeof Gender;
  birthDate?: Date;
  role: keyof typeof USER_ROLE;
  relationshipStatus?: keyof typeof Relationship_Status;
  status: string;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}


