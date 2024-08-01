import express from "express"
import mongoose from "mongoose"
import session from "express-session";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { favouriteRouter } from "./routes/favourite_routes.js";

const app = express();

//Applying middleware
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
//   cookie: { secure: true },

   store: MongoStore.create({
      mongoUrl: process.env.Mongo_Url
})

})
)

dbConnection();





app.use(userRouter);
 app.use(favouriteRouter);




app.listen(4500, () =>
    console.log('Server is running') 
)