import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const codeSnippetSchema = new Schema ({
  title: {type: String, required: true},
  content: {type: String, required: true},
  language: {type: String, required: true},
  description:{type: String, required: true},
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  user: {type:Types.ObjectId, ref:"User"},
})


codeSnippetSchema.plugin(toJSON);
export const CodeSnippetModel = model ("CodeSnippet", codeSnippetSchema);