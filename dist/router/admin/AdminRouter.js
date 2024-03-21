"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminController_1 = __importDefault(require("../../controller/admin/AdminController"));
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class AdminRouts extends BaseRouter_1.default {
    routes() {
        // Protected routes
        //Auth
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //Admin
        this.router.post("/login/", AdminController_1.default.login);
        this.router.post("/create/", AdminController_1.default.create);
    }
}
exports.default = new AdminRouts().router;
