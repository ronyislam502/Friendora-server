import { z } from 'zod';
import { Post_Privacy } from '../../utilities/constant';

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User ID is required.' }),
    content: z.string({ required_error: 'Content is required.' }),
    privacy: z.enum(Object.keys(Post_Privacy) as [string, ...string[]]),
    isPinned: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    hashtags: z.array(z.string()).optional(),
    location: z.string().optional(),
    sharedFrom: z.array(z.string()).optional(),
    pageAuthor: z.array(z.string()).optional(),
  })
});

export const PostValidation = {
  createPostValidationSchema,
};
