import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


//User Model


const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  otherNames: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: { type: String, required: true },
  sendOtpForPasswordReset: { type: String},
  verifyOtpAndResetPassword: { type: Date },
  favourites: [{type:Types.ObjectId, ref: "CodeSnippet"}],
 termsAndConditions: { type: Boolean },
 followers:[{type: Types.ObjectId, ref: 'User'}],
 following:[{type: Types.ObjectId, ref: 'User'}]

 },{
  timestamps: true
});

userSchema.plugin(toJSON);
export const UserModel = model("User", userSchema);

