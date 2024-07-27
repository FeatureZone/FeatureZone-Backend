import { Schema,model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  userSchema.plugin(toJSON);
  export const UserModel = model("User", userSchema);
