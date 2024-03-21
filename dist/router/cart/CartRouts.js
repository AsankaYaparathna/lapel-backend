"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const CartController_1 = __importDefault(require("../../controller/cart/CartController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class CartRouts extends BaseRouter_1.default {
    routes() {
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //cart
        this.router.post("/finish/", CartController_1.default.finish);
        this.router.post("/add/", CartController_1.default.add);
        this.router.get("/getById/:id", CartController_1.default.getById);
        this.router.get("/getCartByUserMobile/:id", CartController_1.default.getCartByUserMobile);
        this.router.get("/getCartByUserId/:id", CartController_1.default.getCartByUserId);
        this.router.get("/get/", CartController_1.default.get);
        this.router.post("/update/noofitem/", CartController_1.default.updateNoofitem);
        this.router.delete("/delete/:id", CartController_1.default.delete);
    }
}
exports.default = new CartRouts().router;
