import { Router } from "express";

import tokenValidation from "../middleware/tokenValidation.js"
import { addToHistory, getHistory } from "../controller/checkoutController.js";

const checkoutRouter = Router();

checkoutRouter.get("/checkout", tokenValidation(), getHistory);
checkoutRouter.post("/checkout", tokenValidation(), addToHistory);


export default checkoutRouter;