import express from 'express';
import { PostControllers } from './post.controller';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../utilities/constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
  multerUpload.fields([{ name: 'media', maxCount: 10 }]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(PostValidation.createPostValidationSchema),
  PostControllers.createPost
);

export const PostRoutes = router;
