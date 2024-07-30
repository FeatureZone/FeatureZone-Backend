import express from "express"
import mongoose from "mongoose"
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { favouriteRouter } from "./routes/favourite_routes.js";

const app = express();

dbConnection();



app.use(express.json());

app.use(userRouter);
 app.use(favouriteRouter);




app.listen(4500, () =>
    console.log('Server is running') 
)