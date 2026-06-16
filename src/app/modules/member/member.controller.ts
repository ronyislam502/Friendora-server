import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { MemberServices } from "./member.service";



const allMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.allMembersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

export const MemberControllers = {
  allMembers,
};
