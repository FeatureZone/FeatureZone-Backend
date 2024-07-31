import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";




const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  otherNames: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String},
  passwordResetTokenExpires: { type: Date },
 
}, 
{
  timestamps: true,
}
);

userSchema.plugin(toJSON);
export const UserModel = model("User", userSchema);

