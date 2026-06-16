import { Schema, model } from "mongoose";
import { MemberModel, TMember } from "./member.interface";
import { Gender, Relationship_Status, User_Status } from "../../utilities/constant";
import { NameSchema } from "../user/user.model";




const memberSchema = new Schema<TMember, MemberModel>(
  {
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
    avatar: {
      type: String,
      default: "",
    },
    cover: {
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
    isDeleted: {
      type: Boolean,
      default: false,
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