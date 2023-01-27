import { Router } from "express";
import { addToCart, deleteCart, getCart, updateCart } from "../controller/cartController.js";
import tokenValidation from "../middleware/tokenValidation.js"
import { gameIdSchema } from "../schema/gameSchema.js";
import schemaValidation from "../middleware/schemaValidation.js"

const cartRouter = Router();

cartRouter.get("/cart", tokenValidation(), getCart); //ad
cartRouter.put("/cart", tokenValidation(), schemaValidation(gameIdSchema), addToCart);
cartRouter.put("/cart-update", tokenValidation(), updateCart); //ad
cartRouter.delete("/cart", tokenValidation(), deleteCart) //ad

export default cartRouter;