import { Router } from "express";
import { addToCart, cleanCart, getCart, updateCart } from "../controller/cartController.js";

import tokenValidation from "../middleware/tokenValidation.js"
import { gameIdSchema } from "../schema/gameSchema.js";
import schemaValidation from "../middleware/schemaValidation.js"

const cartRouter = Router();

cartRouter.get("/cart", tokenValidation(), getCart);
cartRouter.post("/cart", tokenValidation(), schemaValidation(gameIdSchema), addToCart);
cartRouter.put("/update-cart", tokenValidation(), updateCart); 
cartRouter.put("/clear-cart", tokenValidation(), cleanCart);

export default cartRouter;