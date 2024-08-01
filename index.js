import express from "express"
import mongoose from "mongoose"
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { favouriteRouter } from "./routes/favourite_routes.js";
import expressOasGenerator from "express-oas-generator"

const app = express();


dbConnection();

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth","favourites"],
    mongooseModels: mongoose.modelNames(),
});
    



app.use(express.json());

app.use(userRouter);
 app.use(favouriteRouter);
expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect("/api-docs"));


app.listen(4500, () =>
    console.log('Server is running') 
)

