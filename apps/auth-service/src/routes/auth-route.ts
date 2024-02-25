import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.route("/register")
    .get(AuthController.getUser) 
    .post(AuthController.registerUser); 

// Login endpoint
authRouter.route("/login")
  .post(AuthController.login); // Login user

export default authRouter;
