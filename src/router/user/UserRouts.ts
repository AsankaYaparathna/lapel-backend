import BaseRoutes from "../base/BaseRouter";
import UserController from "../../controller/UserController";
import AuthController from "../../controller/AuthController";

class UserRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        //this.router.use(AuthController.authenticateToken);
        this.router.post("/create/", UserController.create);
        this.router.post("/startSession/id", UserController.create);
        this.router.post("/create/resendotp/", UserController.resendOtp);
        this.router.post("/verifyMobile/", UserController.verifyMobile);
        this.router.post("/login/", UserController.login);
        this.router.patch("/update/:id", UserController.update);
        this.router.delete("/delete/:id", UserController.delete);
        this.router.delete("/deleteByMobile/:id", UserController.deleteByMobile);
        this.router.get("/getById/:id", UserController.getById);
        this.router.get("/getByMobile/:id", UserController.getByMobile);
        this.router.get("/get/", UserController.get);
    }
}

export default new UserRouts().router