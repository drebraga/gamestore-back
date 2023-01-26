import { Router } from "express";
import { addToCart } from "../controller/cartController.js";
import tokenValidation from "../middleware/tokenValidation.js"
import { gameIdSchema } from "../schema/gameSchema.js";
import schemaValidation from "../middleware/schemaValidation.js"

const cartRouter = Router();

cartRouter.put("/cart", tokenValidation(), schemaValidation(gameIdSchema), addToCart);

export default cartRouter;