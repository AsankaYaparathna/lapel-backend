import BaseRoutes from "../base/BaseRouter";
import AuthController from "../../controller/AuthController";

class AuthRouts extends BaseRoutes{
    public routes(): void {
        // Auth routes
        this.router.post("/token/", AuthController.generateToken);
        this.router.post("/create/", AuthController.create);
    }
}

export default new AuthRouts().router