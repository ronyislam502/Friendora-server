import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TName, TUser, UserModel } from "./user.interface";
import config from "../../config";
import { Gender, Relationship_Status, USER_ROLE } from "../../utilities/constant";


const NameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  }
})

const userSchema = new Schema<TUser, UserModel>(
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
    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false, // hide password by default
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
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
    relationshipStatus: {
      type: String,
      enum: Object.values(Relationship_Status),
      default: Relationship_Status.single,
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

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
