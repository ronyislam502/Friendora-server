import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin } = req.body;
    const result = await UserServices.createAdminIntoDB(req.file as any, password, admin);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully",
        data: result
    })
})

const createMember = catchAsync(async (req, res) => {
    const { password, member } = req.body;
    const result = await UserServices.createMemberIntoDB(req.file as any, password, member);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Member created successfully",
        data: result
    })
})

export const UserControllers = {
    createAdmin,
    createMember
}