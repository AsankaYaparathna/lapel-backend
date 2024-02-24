
import AuthController from "../../controller/auth/AuthController";
import OrderController from "../../controller/cart/OrderController";
import ShopController from "../../controller/session/SessionController";
import UserController from "../../controller/user/UserController";
import BaseRoutes from "../base/BaseRouter";

class ShopRouter extends BaseRoutes{
    public routes(): void {
        // Protected routes
        //Auth
        this.router.use(AuthController.authenticateToken);

        
        this.router.post("/shop/checkout/", OrderController.shopCheckout);

    }
}

export default new ShopRouter().router