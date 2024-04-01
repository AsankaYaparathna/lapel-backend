"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const MaterialController_1 = __importDefault(require("../../controller/material/MaterialController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class MaterialRouts extends BaseRouter_1.default {
    routes() {
        // Public routes
        // Protected routes
        //Auth
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //Fabric
        this.router.post("/fabric/create/", MaterialController_1.default.createFabric);
        this.router.get("/fabric/get/", MaterialController_1.default.getFabric);
        this.router.get("/fabric/getById/:id", MaterialController_1.default.getFabricById);
        this.router.get("/fabric/getRelatedFabric/:id", MaterialController_1.default.getRelatedFabric);
        this.router.patch("/fabric/update/:id", MaterialController_1.default.updateFabric);
        this.router.delete("/fabric/delete/:id", MaterialController_1.default.deleteFabric);
        //Row Material
        this.router.post("/rowmaterial/create/", MaterialController_1.default.createRowMaterial);
        this.router.get("/rowmaterial/get/", MaterialController_1.default.getRowMaterial);
        this.router.get("/rowmaterial/getById/:id", MaterialController_1.default.getRowMaterialById);
        this.router.patch("/rowmaterial/update/:id", MaterialController_1.default.updateRowMaterial);
        this.router.delete("/rowmaterial/delete/:id", MaterialController_1.default.deleteRowMaterial);
        this.router.get("/rowmaterial/getRelatedRowmaterial/:id", MaterialController_1.default.getRelatedRowmaterial);
        this.router.get("/stockitem/list/", MaterialController_1.default.getRowMaterialList);
    }
}
exports.default = new MaterialRouts().router;
