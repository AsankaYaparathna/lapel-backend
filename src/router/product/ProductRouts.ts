import AuthController from "../../controller/auth/AuthController";
import ProductController from "../../controller/product/ProductController";
import BaseRoutes from "../base/BaseRouter";

class ProductRouts extends BaseRoutes{
    public routes(): void {
        // Protected routes
        this.router.use(AuthController.authenticateToken);;

        //custom product
        this.router.post("/custom/create/", ProductController.createCustomProduct);
        this.router.get("/custom/get/", ProductController.getCustomProduct);
        this.router.get("/custom/getById/:id", ProductController.getCustomProductById);
        this.router.patch("/custom/update/:id", ProductController.updateCustomProduct);
        this.router.patch("/custom/update/option/:id", ProductController.updateCustomProductOption);
        this.router.delete("/custom/delete/:id", ProductController.deleteCustomProduct);
        this.router.get("/custom/getSubOptionById/:id", ProductController.getSubOptionById);

        //package
        this.router.post("/custom/package/create/", ProductController.createPackage);
        this.router.get("/custom/package/get/", ProductController.getPackage);
        this.router.get("/custom/package/getById/:id", ProductController.getPackageById);
        this.router.patch("/custom/package/update/:id", ProductController.updatePackage);
        this.router.delete("/custom/package/delete/:id", ProductController.deletePackage);

        
        //Rady made

    }
}

export default new ProductRouts().router