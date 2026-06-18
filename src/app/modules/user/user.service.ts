import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFile } from "../../interface/image.interface";
import { TAdmin } from "../admin/admin.interface";
import { TMember } from "../member/member.interface";
import { TUser } from "./user.interface";
import { USER_ROLE } from "../../utilities/constant";
import mongoose from "mongoose";
import { User } from "./user.model";
import { Admin } from "../admin/admin.model";
import { Member } from "../member/member.model";

const createAdminIntoDB = async (image: TImageFile, password: string, payload: TAdmin) => {
console.log("image", image)
    const userData: Partial<TUser> = {
        name: payload.name,
        email: payload.email,
        password: password as string,
        role: USER_ROLE?.admin,
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        if (image && image.path) {
            payload.avatar = image.path;
        }

        const newUser = await User.create([userData], { session });

        if (!newUser?.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
        }

        payload.user = newUser[0]._id;

        const newAdmin = await Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}

const createMemberIntoDB = async (image: TImageFile, password: string, payload: TMember) => {



    const userData: Partial<TUser> = {
        name: {
            firstName: payload.name.firstName,
            middleName: payload.name.middleName,
            lastName: payload.name.lastName
        },
        email: payload.email,
        password: password as string,
        role: USER_ROLE?.user,
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        if (image && image.path) {
            payload.profilePicture = image.path;
        }

        const newUser = await User.create([userData], { session });

        if (!newUser?.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
        }

        payload.user = newUser[0]._id;

        const newMember = await Member.create([payload], { session });
        if (!newMember.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create member");
        }

        await session.commitTransaction();
        await session.endSession();

        return newMember;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}


export const UserServices = {
    createAdminIntoDB,
    createMemberIntoDB
}