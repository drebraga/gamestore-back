import { signIn, signUp} from "../controllers/authController.js";
import { Router } from "express";
import { signUpValidation } from "../middlewares/signUpMiddleware.js";

const authRouter = Router()

authRouter.post("/sign-up",signUpValidation,signUp)
authRouter.post("/sign-in",signIn)

export default authRouter
