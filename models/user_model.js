import { Schema,model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snippet' }]
  });

  userSchema.plugin(toJSON);
  export const UserModel = ("User", userSchema);
