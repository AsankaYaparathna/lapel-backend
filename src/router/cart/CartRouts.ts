import AuthController from "../../controller/auth/AuthController";
import CartController from "../../controller/cart/CartController";
import BaseRoutes from "../base/BaseRouter";

class CartRouts extends BaseRoutes{
    public routes(): void {
        
        this.router.use(AuthController.authenticateToken);

        //cart
        this.router.post("/create/", CartController.create);
        this.router.get("/get/", CartController.get);
        this.router.get("/getById/:id", CartController.getById);
        this.router.patch("/update/:id", CartController.update);
        this.router.delete("/delete/:id", CartController.delete);

    }
}

export default new CartRouts().router