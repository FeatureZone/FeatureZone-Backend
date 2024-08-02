import express from "express"
import mongoose from "mongoose"
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { favouriteRouter } from "./routes/favourite_routes.js";
import expressOasGenerator from "express-oas-generator"
import { getUserRouter } from "./routes/getUser_route.js";
import { ContributorRouter } from "./routes/project_routes.js";
const app = express();


//Applying middleware
app.use(cors({credentials: true, origin: '*'}));
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


expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth","userProfile", "codeSnippet", "favourites"],
    mongooseModels: mongoose.modelNames(),
});
    

dbConnection();



app.use(userRouter);
app.use(favouriteRouter);
app.use(getUserRouter);
app.use(ContributorRouter);
expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect("/api-docs"));


app.listen(4500, () =>
    console.log('Server is running') 
)

