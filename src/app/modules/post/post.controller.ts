import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { PostServices } from './post.service';
import { TImageFiles } from '../../interface/image.interface';

const createPost = catchAsync(async (req, res) => {
    let payload = req.body;
    
    if (req.body.data) {
        payload = JSON.parse(req.body.data);
    }

    const result = await PostServices.createPostIntoDB(req.files as TImageFiles, payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Post created successfully',
        data: result,
    });
});

export const PostControllers = {
    createPost
};
