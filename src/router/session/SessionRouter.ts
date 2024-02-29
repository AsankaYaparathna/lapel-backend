import AuthController from "../../controller/auth/AuthController";
import ShopController from "../../controller/session/SessionController";
import UserController from "../../controller/user/UserController";
import BaseRoutes from "../base/BaseRouter";

class SessionRouter extends BaseRoutes{
    public routes(): void {
        // Protected routes
        //Auth
        //this.router.use(AuthController.authenticateToken);

        //Admin
        this.router.post("/start/", ShopController.startSession);
        this.router.post("/session/create/", UserController.startSession);

    }
}

export default new SessionRouter().router