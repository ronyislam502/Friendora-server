import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder"
import AppError from "../../errors/AppError";
import { Admin } from "./admin.model"
import mongoose from "mongoose";
import { TImageFile } from "../../interface/image.interface";
import { TAdmin } from "./admin.interface";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";

const allAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(
        Admin.find().populate("user", "role password status needsPasswordChange"),
        query
    )
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await adminQuery.countTotal();
    const data = await adminQuery.modelQuery;

    return { meta, data };
};

const singleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);

    return result
}

const updateAdminIntoDB = async (
    adminId: string,
    image: TImageFile,
    payload: Partial<TAdmin>
) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // check admin existence
        const isAdminExists = await Admin.findById(adminId).session(session);
        if (!isAdminExists) {
            throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
        }

        // image set
        if (image && image.path) {
            payload.avatar = image.path;
        }

        const userData: Partial<TUser> = {
            email: payload.email,
        };

        if (payload.name) {
            userData.name = {
                firstName: payload.name.firstName,
                middleName: payload.name.middleName,
                lastName: payload.name.lastName
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            isAdminExists.user,
            userData,
            { new: true, session }
        );

        if (!updatedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user");
        }

        // update admin
        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            payload,
            { new: true, session }
        );

        if (!updatedAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update admin");
        }

        await session.commitTransaction();
        await session.endSession();

        return updatedAdmin;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        const deletedAdmin = await Admin.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
        }

        const userId = deletedAdmin.user;
        const deletedUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedAdmin;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};


export const AdminServices = {
    allAdminsFromDB,
    singleAdminFromDB,
    deleteAdminFromDB,
    updateAdminIntoDB
}