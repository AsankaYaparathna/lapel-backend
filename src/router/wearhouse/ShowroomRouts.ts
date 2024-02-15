import AuthController from "../../controller/auth/AuthController";
import ShowrooomController from "../../controller/wearhouse/ShowrooomController";
import BaseRoutes from "../base/BaseRouter";

class ShowroomRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        this.router.use(AuthController.authenticateToken);
        this.router.post("/create/", ShowrooomController.create);
        this.router.patch("/update/:id", ShowrooomController.update);
        this.router.delete("/delete/:id", ShowrooomController.delete);
        this.router.get("/getById/:id", ShowrooomController.getById);
        this.router.get("/get/", ShowrooomController.get);
    }
}

export default new ShowroomRouts().router