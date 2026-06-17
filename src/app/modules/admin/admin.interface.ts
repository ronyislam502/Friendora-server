import { Model, Types } from "mongoose";
import { TName } from "../user/user.interface";

export type TAdmin = {
    user: Types.ObjectId;
    name: TName;
    email: string;
    avatar?: string;
    phone: string;
    isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
    isUserExists(email: string): Promise<TAdmin | null>;
}
