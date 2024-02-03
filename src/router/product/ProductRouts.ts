import ProductController from "../../controller/product/ProductController";
import BaseRoutes from "../base/BaseRouter";

class ProductRouts extends BaseRoutes{
    public routes(): void {
        // Protected routes
        //this.router.use(AuthController.authenticateToken);

        //Custom
        this.router.post("/custom/create/", ProductController.createCustomProduct);
        this.router.get("/custom/get/", ProductController.getCustomProduct);
        this.router.get("/custom/getById/:id", ProductController.getCustomProductById);
        this.router.patch("/custom/update/:id", ProductController.updateCustomProduct);
        this.router.delete("/custom/delete/:id", ProductController.deleteCustomProduct);

        //Rady made

    }
}

export default new ProductRouts().router