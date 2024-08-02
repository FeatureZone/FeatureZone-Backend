import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const commentSchema = new Schema ({
    text:{type: String, required: true},
    user: {type: Types.ObjectId, ref: "User"},
    codeSnippet: {type: Types.ObjectId, ref: "codeSnippet"}
}, {
    timestamps: true
})


commentSchema.plugin(toJSON)
export const CommentModel = model("Comment", commentSchema)