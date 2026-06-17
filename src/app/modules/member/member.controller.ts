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

const updateProfilePicture = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateProfilePicture(id, req.file as any);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Profile picture updated successfully", data: result });
});

const updateCoverPhoto = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateCoverPhoto(id, req.file as any);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Cover photo updated successfully", data: result });
});

const updateBio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateBio(id, req.body.bio);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Bio updated successfully", data: result });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateCategory(id, req.body.category);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Category updated successfully", data: result });
});

const updatePersonalDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updatePersonalDetails(id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Personal details updated successfully", data: result });
});

const updateWorkInformation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateWorkInformation(id, req.body.work);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Work information updated successfully", data: result });
});

const updateEducationInformation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateEducationInformation(id, req.body.education);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Education information updated successfully", data: result });
});

const updateHobbies = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateHobbies(id, req.body.hobbies);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Hobbies updated successfully", data: result });
});

const updateInterests = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateInterests(id, req.body.interests);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Interests updated successfully", data: result });
});

const updateTravelInformation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateTravelInformation(id, req.body.travelInformation);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Travel information updated successfully", data: result });
});

const updateContactInformation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateContactInformation(id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Contact information updated successfully", data: result });
});

export const MemberControllers = {
  allMembers,
  updateProfilePicture,
  updateCoverPhoto,
  updateBio,
  updateCategory,
  updatePersonalDetails,
  updateWorkInformation,
  updateEducationInformation,
  updateHobbies,
  updateInterests,
  updateTravelInformation,
  updateContactInformation
};
