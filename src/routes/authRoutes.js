import { autoSignIn, signIn, signUp} from "../controller/authController.js";
import { Router } from "express";
import { signUpValidation } from "../middleware/signUpMiddleware.js";
import tokenValidation from "../middleware/tokenValidation.js";

const authRouter = Router()

authRouter.get("/sign-in", tokenValidation(), autoSignIn)
authRouter.post("/sign-up",signUpValidation,signUp)
authRouter.post("/sign-in",signIn)

export default authRouter
