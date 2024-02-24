import AuthController from "../../controller/auth/AuthController";
import OrderController from "../../controller/cart/OrderController";
import BaseRoutes from "../base/BaseRouter";

class OrderRouts extends BaseRoutes{
    public routes(): void {
        
        this.router.use(AuthController.authenticateToken);

        //order
        this.router.post("/checkout/", OrderController.checkout);
        this.router.get("/get/", OrderController.get);
        this.router.get("/getById/:id", OrderController.getById);
        this.router.patch("/update/:id", OrderController.update);
        this.router.delete("/delete/:id", OrderController.delete);

        this.router.patch("/update/payment/:id", OrderController.updatePayment);
        this.router.patch("/update/status/:id", OrderController.updateStatus);

        this.router.post("/shop/checkout/", OrderController.shopCheckout);

    }
}

export default new OrderRouts().router