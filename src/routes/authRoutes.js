import { signIn, signUp} from "../controller/authController.js";
import { Router } from "express";
import { signUpValidation } from "../middleware/signUpMiddleware.js";

const authRouter = Router()

authRouter.post("/sign-up",signUpValidation,signUp)
authRouter.post("/sign-in",signIn)

export default authRouter
