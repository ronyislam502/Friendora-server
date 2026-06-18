import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TPost } from "./post.interface";
import { TImageFiles } from "../../interface/image.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (medias: TImageFiles, payload: TPost) => {
    const isUser = await User.findById(payload.user);

    if (!isUser) {
        throw new AppError(httpStatus.NOT_FOUND, "This user not found!");
    }

    if (medias && medias.media) {
        payload.media = medias.media.map(file => file.path);
    }

    const result = await Post.create(payload);
    return result;
}

export const PostServices = {
    createPostIntoDB
};