import { Schema, model } from 'mongoose';
import { TPage } from './page.interface';
import { Page_Role } from '../../utilities/constant';

const pageAdminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(Page_Role),
      required: true,
    },
  },
  { _id: false }
);

const pageSchema = new Schema<TPage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
    },
    cover: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    admins: {
      type: [pageAdminSchema],
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

pageSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

pageSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

pageSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Page = model<TPage>('Page', pageSchema);
