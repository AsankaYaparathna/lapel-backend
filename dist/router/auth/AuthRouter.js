"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
class AuthRouts extends BaseRouter_1.default {
    routes() {
        // Auth routes
        this.router.post("/token/", AuthController_1.default.generateToken);
        this.router.post("/create/", AuthController_1.default.create);
    }
}
exports.default = new AuthRouts().router;
