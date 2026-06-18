import { Schema, model } from 'mongoose';
import { TPost } from './post.interface';
import { Post_Privacy } from '../../utilities/constant';

const postSchema = new Schema<TPost>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: {
            type: [String],
        },
        privacy: {
            type: String,
            enum: Object.keys(Post_Privacy),
            required: true,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        hashtags: {
            type: [String],
        },
        location: {
            type: String,
        },
        sharedFrom: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        pageAuthor: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Page', // Assuming a Page model exists
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

postSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

postSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

postSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});


export const Post = model<TPost>('Post', postSchema);
