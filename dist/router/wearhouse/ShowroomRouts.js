"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const ShowrooomController_1 = __importDefault(require("../../controller/wearhouse/ShowrooomController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class ShowroomRouts extends BaseRouter_1.default {
    routes() {
        // Public routes
        // Protected routes
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        this.router.post("/create/", ShowrooomController_1.default.create);
        this.router.patch("/update/:id", ShowrooomController_1.default.update);
        this.router.delete("/delete/:id", ShowrooomController_1.default.delete);
        this.router.get("/getById/:id", ShowrooomController_1.default.getById);
        this.router.get("/get/", ShowrooomController_1.default.get);
    }
}
exports.default = new ShowroomRouts().router;
