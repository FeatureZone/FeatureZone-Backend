import express from "express"
import mongoose from "mongoose"
import { dbConnection } from "./config/db.js";

const app = express();

dbConnection();






app.listen(4500, () =>
    console.log('Server is running') 
)