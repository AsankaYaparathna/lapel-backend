import AuthController from "../../controller/auth/AuthController";
import CartController from "../../controller/cart/CartController";
import OrderController from "../../controller/cart/OrderController";
import BaseRoutes from "../base/BaseRouter";

class CartRouts extends BaseRoutes{
    public routes(): void {
        
        this.router.use(AuthController.authenticateToken);

        //cart
        this.router.post("/finish/", CartController.finish);
        this.router.post("/add/", CartController.add);
        this.router.post("/update/noofitem/", CartController.updateNoofitem);
        
        this.router.get("/getById/:id", CartController.getById);
        this.router.get("/getCartByUserMobile/:id", CartController.getCartByUserMobile);
        this.router.get("/getCartByUserId/:id", CartController.getCartByUserId);
        this.router.get("/get/", CartController.get);
        
        this.router.post("/update/noofitem/", CartController.updateNoofitem);
        this.router.delete("/delete/:id", CartController.delete);
    }
}

export default new CartRouts().router