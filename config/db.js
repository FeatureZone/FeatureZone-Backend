import mongoose from "mongoose";

import 'dotenv/config'

const connectionString = process.env.Mongo_url



export const dbConnection = async () => {
   try {
     await mongoose.connect(connectionString)
         console.log('Database is connected')
     
   } catch (error) {
    console.log(error)
   }
}
