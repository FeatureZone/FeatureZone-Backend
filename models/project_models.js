import { Schema, model, Types } from "mongoose"
import { toJSON } from "@reis/mongoose-to-json";

const ProjectSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  language: {type: String, required: true},
  description:{type: String, required: true},
  Contributors: {type:Types.ObjectId,
    ref: 'User'}
})


ProjectSchema.plugin(toJSON);
export const ProjectModel = model ("Project", ProjectSchema);