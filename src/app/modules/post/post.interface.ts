import { Types } from "mongoose";
import { Post_Privacy } from "../../utilities/constant";


export type TPost = {
    user: Types.ObjectId;
    content: string;
    media?: string[];
    privacy: keyof typeof Post_Privacy;
    isPinned?: boolean;
    tags?: Types.ObjectId[];
    hashtags?: string[];
    location?: string;
    sharedFrom?: Types.ObjectId[];
    pageAuthor?: Types.ObjectId[];
    isDeleted?: boolean;
};

