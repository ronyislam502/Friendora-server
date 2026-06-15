import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (payload: TUser) => {
  if (payload.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "User email already exists")
  }
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
};
