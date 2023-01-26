import { Router } from "express";
import { getCatalog, getGame, postGame } from "../controller/catalog.js";

const catalogRouter = Router();

catalogRouter.get("/catalog", getCatalog);
catalogRouter.get("/catalog/:search", getGame);
catalogRouter.post("/catalog/", postGame);

export default catalogRouter;