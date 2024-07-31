import { Router } from "express";
import { createCode, deleteCode, getAllCodes, getOneCode, updateCode } from "../controllers/codesnippet-controller.js";


export const codesnippetRouter = Router()

codesnippetRouter.post("codes", createCode);

codesnippetRouter.get("/codes", getAllCodes);

codesnippetRouter.get("/codes/:codeId", getOneCode);

codesnippetRouter.patch("/codes/:codeId", updateCode);

codesnippetRouter.delete("/codes/:codeId", deleteCode);
