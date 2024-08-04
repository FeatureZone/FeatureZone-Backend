import { Router } from "express";
import { createCode, deleteCode, getAllCodes, getOneCode, updateCode } from "../controllers/codesnippet-controller.js";


export const codesnippetRouter = Router()

codesnippetRouter.post("codeSnippet", createCode);

codesnippetRouter.get("/codeSnippet", getAllCodes);

codesnippetRouter.get("/codeSnippet/:id", getOneCode);

codesnippetRouter.patch("/codeSnippet/:id", updateCode);

codesnippetRouter.delete("/codeSnippet/:id", deleteCode);
