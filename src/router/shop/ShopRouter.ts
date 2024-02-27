
import AuthController from "../../controller/auth/AuthController";
import OrderController from "../../controller/cart/OrderController";
import BaseRoutes from "../base/BaseRouter";

class ShopRouter extends BaseRoutes{
    public routes(): void {
        // Protected routes
        //Auth
        //this.router.use(AuthController.authenticateToken);;;

        this.router.post("/order/checkout/", OrderController.shopCheckout);
        this.router.post("/order/setOff/", OrderController.setOff);

        this.router.get("/get/", OrderController.get);
        this.router.get("/getById/:id", OrderController.getById);
        
        //this.router.patch("/update/:id", OrderController.update);
        //this.router.delete("/delete/:id", OrderController.delete);

        this.router.patch("/update/payment/:id", OrderController.updatePayment);
        this.router.patch("/update/status/:id", OrderController.updateStatus);

        this.router.get("/invoice/getByOrderId/:id", OrderController.getInvoiceByCartId);
        this.router.get("/invoice/getById/:id", OrderController.getByInvId);
        this.router.get("/invoice/getByInvoiceNo/:id", OrderController.getByInvNo);
    }
}

export default new ShopRouter().router