import { Router } from "express";
import { createCode, deleteCode, getAllCodes, getOneCode, updateCode } from "../controllers/codesnippet-controller.js";


export const codesnippetRouter = Router()

codesnippetRouter.post("codes", createCode);

codesnippetRouter.get("/codes", getAllCodes);

codesnippetRouter.get("/codes/:id", getOneCode);

codesnippetRouter.patch("/codes/:id", updateCode);

codesnippetRouter.delete("/codes/:id", deleteCode);
