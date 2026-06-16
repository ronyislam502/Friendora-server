import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { USER_ROLE } from "../../utilities/constant";
import { TName, TUser, UserModel } from "./user.interface";



export const NameSchema = new Schema<TName>({
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
            type: String,
            required: [true, "Name is required"],
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
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: Object.keys(USER_ROLE),
            default: USER_ROLE.user,
            required: [true, "Role is required"],
        },
        passwordChangedAt: {
            type: Date,
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
    const user = this;
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

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: number,
    jwtIssuedTimestamp: number
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);
