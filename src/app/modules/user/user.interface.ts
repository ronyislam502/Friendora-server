/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from "mongoose";
import { Page_Role, USER_ROLE } from "../../utilities/constant";

export type TName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TAddress = {
    street?: string;
    city?: string;
    state?: string;
    postalCode: string;
    country: string;
};

export type TPageAdmin = {
    user: Types.ObjectId;
    role: keyof typeof Page_Role;
};


export type TUser = {
    name: TName;
    email: string;
    password: string;
    role: keyof typeof USER_ROLE;
    passwordChangedAt?: Date;
    isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number
    ): boolean;
}

