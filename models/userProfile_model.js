import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


 const userProfileSchema = new Schema({
    profilePicture: { type: String },
    sex: { type: String, enum: ["male", "female"] },
    address: { type: String },
    dateOfBirth: { type: String },
    bio: { type: String },
    contact: { type: String },
    user: { type: Types.ObjectId, ref: 'User' },

}, {
    timestamps: true
})

userProfileSchema.plugin(toJSON);
export const UserProfileModel = model("UserProfile", userProfileSchema);