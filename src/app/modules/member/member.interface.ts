/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from "mongoose";
import { Gender, Relationship_Status, User_Status } from "../../utilities/constant";
import { TName } from "../user/user.interface";



export type TMember = {
  email: string;
  name: TName;
  bio?: string;
  avatar?: string;
  cover?: string;
  gender?: keyof typeof Gender;
  birthDate?: Date;
  relationshipStatus?: keyof typeof Relationship_Status;
  status: keyof typeof User_Status;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface MemberModel extends Model<TMember> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TMember>;
}


