import AuthController from "../../controller/auth/AuthController";
import WearhouseController from "../../controller/wearhouse/WearhouseController";
import BaseRoutes from "../base/BaseRouter";

class WearhouseRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        this.router.use(AuthController.authenticateToken);
        this.router.post("/create/", WearhouseController.create);
        this.router.patch("/update/:id", WearhouseController.update);
        this.router.delete("/delete/:id", WearhouseController.delete);
        this.router.get("/getById/:id", WearhouseController.getById);
        this.router.get("/get/", WearhouseController.get);
    }
}

export default new WearhouseRouts().router