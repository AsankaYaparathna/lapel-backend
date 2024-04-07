"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const ProductController_1 = __importDefault(require("../../controller/product/ProductController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class ProductRouts extends BaseRouter_1.default {
    routes() {
        // Protected routes
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //custom product
        this.router.post("/custom/create/", ProductController_1.default.createCustomProduct);
        this.router.get("/custom/get/", ProductController_1.default.getCustomProduct);
        this.router.get("/get/custom/product", ProductController_1.default.getCustomProducts);
        this.router.get("/custom/getById/:id", ProductController_1.default.getCustomProductById);
        this.router.get("/custom/getByName/:id", ProductController_1.default.getCustomProductByName);
        this.router.get("/custom/getByProdId/:prodId/:opId", ProductController_1.default.getCustomProductOptionByProdIds);
        this.router.get("/custom/getByProdName/:prodId/:opId", ProductController_1.default.getCustomProductOptionByProdName);
        this.router.patch("/custom/update/:id", ProductController_1.default.updateCustomProduct);
        this.router.post("/custom/option/add/:id", ProductController_1.default.addCustomProductOption);
        this.router.patch("/custom/option/update/:id", ProductController_1.default.updateCustomProductOption);
        this.router.delete("/custom/option/delete/:id", ProductController_1.default.deleteCustomProductOption);
        this.router.get("/custom/option/getById/:id", ProductController_1.default.getCustomProductOption);
        this.router.get("/custom/option/getByProdIdId/:id", ProductController_1.default.getCustomProductOptionByProdId);
        this.router.delete("/custom/delete/:id", ProductController_1.default.deleteCustomProduct);
        this.router.get("/custom/getSubOptionById/:id", ProductController_1.default.getSubOptionById);
        this.router.patch("/custom/product/update/backview/:id", ProductController_1.default.updateCustomProductOptionBackView);
        this.router.patch("/custom/product/update/backview/byname/:id", ProductController_1.default.updateCustomProductOptionBackViewByName);
        this.router.patch("/custom/product/update/frontview/:id", ProductController_1.default.updateCustomProductOptionFrontView);
        this.router.patch("/custom/product/update/frontview/byname/:id", ProductController_1.default.updateCustomProductOptionFrontViewByName);
        //package
        this.router.post("/custom/package/create/", ProductController_1.default.createPackage);
        this.router.get("/custom/package/get/", ProductController_1.default.getPackage);
        this.router.get("/custom/package/getById/:id", ProductController_1.default.getPackageById);
        this.router.patch("/custom/package/update/:id", ProductController_1.default.updatePackage);
        this.router.delete("/custom/package/delete/:id", ProductController_1.default.deletePackage);
        //cstom config
        this.router.get("/custom/config/styles/getByProdId/:id/", ProductController_1.default.getPackageStyleById);
        this.router.get("/custom/config/accent/getByProdId/:id/", ProductController_1.default.getPackageAccentById);
        //hide rule
        this.router.get("/custom/option/hiderule/:id", ProductController_1.default.getCustomProductHideRules);
        this.router.get("/custom/option/defaultLoading/:id", ProductController_1.default.getCustomProductHideRules);
        this.router.get("/custom/suboption/hiderule/:id", ProductController_1.default.getCustomProductSubOptionHideRules);
        this.router.get("/custom/suboption/defaultLoading/:id", ProductController_1.default.getCustomProductSubOptionHideRules);
        //Rady made
    }
}
exports.default = new ProductRouts().router;
