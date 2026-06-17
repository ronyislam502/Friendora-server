import { Schema, model } from "mongoose";
import { MemberModel, TMember } from "./member.interface";
import { Gender, Relationship_Status, User_Status } from "../../utilities/constant";
import { addressSchema, NameSchema } from "../user/user.model";




const memberSchema = new Schema<TMember, MemberModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: NameSchema,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
    },
    work: {
      type: String,
      default: "",
    },
    education: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    address: {
      type: addressSchema,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
      default: [],
    },
    blockedUsers: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
      default: [],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    pages: {
      type: [Schema.Types.ObjectId],
      ref: "Page",
      default: [],
    },
    groupes: {
      type: [Schema.Types.ObjectId],
      ref: "Group",
      default: [],
    },
    relationshipStatus: {
      type: String,
      enum: Object.values(Relationship_Status),
      default: Relationship_Status.single,
    },
    status: {
      type: String,
      enum: Object.values(User_Status),
      default: User_Status.active,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isVerifiedBadge: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: [String],
      default: [],
    },
    hobbies: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    travelInformation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


memberSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

memberSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

memberSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


memberSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Member.findOne({ email });
  return existingUser;
};


export const Member = model<TMember, MemberModel>("Member", memberSchema);