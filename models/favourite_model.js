import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const favouriteSchema = new Schema ({
   itemType: {type: String, enum:['snippet', 'contributor', 'component', 'comment', 'repository', 'documentation']} ,
   notes: {type: String},
   status: {type: String, enum:['actve', 'archived'], default: 'active'},
   priority: {type: Number},
   user: {type: Types.ObjectId, ref: "User", select: false}
})


favouriteSchema.plugin(toJSON);
export const favouriteModel = model ("Favourite", favouriteSchema);