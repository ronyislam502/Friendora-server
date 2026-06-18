import { Types } from "mongoose";
import { TPageAdmin } from "../user/user.interface";

export type TPage = {
    user: Types.ObjectId;
    name: string;
    category: string[];
    bio?: string;
    cover?: string;
    profilePicture?: string;
    coverPhoto?: string;
    admins: TPageAdmin[];
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    isVerified: Boolean;
    isDeleted: boolean
};