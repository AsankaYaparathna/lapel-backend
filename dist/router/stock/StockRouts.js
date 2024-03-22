"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const StockController_1 = __importDefault(require("../../controller/stock/StockController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class StockRouts extends BaseRouter_1.default {
    routes() {
        // Public routes
        // Protected routes
        //Auth
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //Row Material
        this.router.post("/rowmaterial/variants/", StockController_1.default.stockVariants);
        this.router.get("/rowmaterial/variants/log/", StockController_1.default.getStockLog);
    }
}
exports.default = new StockRouts().router;
