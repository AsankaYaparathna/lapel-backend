import AdminController from "../../controller/admin/AdminController";
import AuthController from "../../controller/auth/AuthController";
import BaseRoutes from "../base/BaseRouter";

class AdminRouts extends BaseRoutes{
    public routes(): void {
        // Protected routes
        //Auth
        this.router.use(AuthController.authenticateToken);;

        //Admin
        this.router.post("/login/", AdminController.login);
        this.router.post("/create/", AdminController.create);

    }
}

export default new AdminRouts().router