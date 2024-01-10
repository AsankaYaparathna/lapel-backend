import BaseRoutes from "./base/BaseRouter";
import validate from "../helper/validate";
import { createUserSchema, updateUserSchema } from "../schema/UserSchema";
import UserController from "../controller/UserController";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthController from "../controller/AuthController";

class UserRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        //this.router.use(AuthController.authenticateToken);
        this.router.post("/create/", UserController.create);
        this.router.post("/create/resendotp/", UserController.resendOtp);
        this.router.post("/verifyMobile/", UserController.verifyMobile);
        this.router.post("/login/", UserController.login);
        this.router.patch("/update/:id", validate(updateUserSchema), UserController.update);
        this.router.delete("/delete/:id", UserController.delete);
        this.router.get("/getById/:id", UserController.getById);
        this.router.get("/mobile/:id", UserController.getByMobile);
        this.router.get("/get/", UserController.get);
    }
}

export default new UserRouts().router