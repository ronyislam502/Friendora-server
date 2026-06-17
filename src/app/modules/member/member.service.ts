
import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { TImageFile } from "../../interface/image.interface";
import { TMember } from "./member.interface";
import { Member } from "./member.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";


const allMembersFromDB = async (query: Record<string, unknown>) => {
  const memberQuery = new QueryBuilder(Member.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await memberQuery.countTotal();
  const data = await memberQuery.modelQuery

  return { meta, data };
};

const updateMemberIntoDB = async (
  id: string,
  image: TImageFile,
  payload: Partial<TMember>
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // check admin existence
    const isAdminExists = await Member.findById(id).session(session);
    if (!isAdminExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
    }

    // image set
    if (image && image.path) {
      payload.profilePicture = image.path;
    }

    const userData: Partial<TUser> = {
      email: payload.email,
    };

    if (payload.name) {
      userData.name = `${payload.name.firstName} ${payload.name.middleName ? payload.name.middleName + ' ' : ''}${payload.name.lastName}`.replace(/\s+/g, ' ').trim();
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
    const updatedMember = await Member.findByIdAndUpdate(
      isAdminExists._id,
      payload,
      { new: true, session }
    );

    if (!updatedMember) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return updatedMember;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const deleteMemberFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const isDeletedMember = await Member.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!isDeletedMember) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }

    const userId = isDeletedMember.user;
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

    return isDeletedMember;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const updateProfilePicture = async (id: string, image: TImageFile) => {
  if (!image || !image.path) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image is required");
  }
  const updatedMember = await Member.findByIdAndUpdate(
    id,
    { profilePicture: image.path },
    { new: true }
  );
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateCoverPhoto = async (id: string, image: TImageFile) => {
  if (!image || !image.path) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image is required");
  }
  const updatedMember = await Member.findByIdAndUpdate(
    id,
    { coverPhoto: image.path },
    { new: true }
  );
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateBio = async (id: string, bio: string) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { bio }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateCategory = async (id: string, category: string[]) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { category }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateWorkInformation = async (id: string, work: string) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { work }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateEducationInformation = async (id: string, education: string[]) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { education }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateHobbies = async (id: string, hobbies: string[]) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { hobbies }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateInterests = async (id: string, interests: string[]) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { interests }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updateTravelInformation = async (id: string, travelInformation: string) => {
  const updatedMember = await Member.findByIdAndUpdate(id, { travelInformation }, { new: true });
  if (!updatedMember) throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  return updatedMember;
};

const updatePersonalDetails = async (
  id: string,
  payload: Pick<TMember, 'name' | 'gender' | 'birthDate' | 'relationshipStatus'>
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isMemberExists = await Member.findById(id).session(session);
    if (!isMemberExists) throw new AppError(httpStatus.NOT_FOUND, "Member not found");

    if (payload.name) {
      const nameString = `${payload.name.firstName} ${payload.name.middleName ? payload.name.middleName + ' ' : ''}${payload.name.lastName}`.replace(/\s+/g, ' ').trim();
      const updatedUser = await User.findByIdAndUpdate(
        isMemberExists.user,
        { name: nameString },
        { new: true, session }
      );
      if (!updatedUser) throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user name");
    }

    const updatedMember = await Member.findByIdAndUpdate(id, payload, { new: true, session });
    if (!updatedMember) throw new AppError(httpStatus.BAD_REQUEST, "Failed to update member");

    await session.commitTransaction();
    await session.endSession();
    return updatedMember;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

const updateContactInformation = async (
  id: string,
  payload: Pick<TMember, 'email' | 'phone' | 'location' | 'address'>
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isMemberExists = await Member.findById(id).session(session);
    if (!isMemberExists) throw new AppError(httpStatus.NOT_FOUND, "Member not found");

    if (payload.email) {
      const updatedUser = await User.findByIdAndUpdate(
        isMemberExists.user,
        { email: payload.email },
        { new: true, session }
      );
      if (!updatedUser) throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user email");
    }

    const updatedMember = await Member.findByIdAndUpdate(id, payload, { new: true, session });
    if (!updatedMember) throw new AppError(httpStatus.BAD_REQUEST, "Failed to update member");

    await session.commitTransaction();
    await session.endSession();
    return updatedMember;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const MemberServices = {
  allMembersFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
  updateProfilePicture,
  updateCoverPhoto,
  updateBio,
  updateCategory,
  updateWorkInformation,
  updateEducationInformation,
  updateHobbies,
  updateInterests,
  updateTravelInformation,
  updatePersonalDetails,
  updateContactInformation
};
