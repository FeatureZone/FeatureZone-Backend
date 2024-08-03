import { Router } from "express";
import { addContributor } from "../controllers/contributor_controller.js";

export const ContributorRouter = Router();


ContributorRouter.post('/add-contributor',addContributor );

