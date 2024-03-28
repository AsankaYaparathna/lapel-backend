"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const CommonController_1 = __importDefault(require("../../controller/common/CommonController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
const multer_1 = __importDefault(require("multer"));
class CommonRouts extends BaseRouter_1.default {
    routes() {
        // Public routes
        // Protected routes
        //Auth
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //Color
        this.router.post("/color/create/", CommonController_1.default.createColor);
        this.router.get("/color/get/", CommonController_1.default.getColor);
        //Pattern
        this.router.post("/pattern/create/", CommonController_1.default.createPattern);
        this.router.get("/pattern/get/", CommonController_1.default.getPattern);
        //Material
        this.router.post("/material/create/", CommonController_1.default.createMaterial);
        this.router.get("/material/get/", CommonController_1.default.getMaterial);
        //Characteristic
        this.router.post("/characteristic/create/", CommonController_1.default.createCharacteristics);
        this.router.get("/characteristic/get/", CommonController_1.default.getCharacteristics);
        //Image
        this.router.post("/image/create/", CommonController_1.default.createImage);
        this.router.get("/image/get/:id", CommonController_1.default.getImageById);
        this.router.patch("/image/update/:id", CommonController_1.default.updateImage);
        this.router.delete("/image/delete/:id", CommonController_1.default.deleteImage);
        const upload = (0, multer_1.default)({ dest: "uploads/" });
        this.router.post("/image/upload/", upload.single("image"), CommonController_1.default.uploadImage);
        //Opacity
        this.router.post("/opacity/create/", CommonController_1.default.createOpacity);
        this.router.get("/opacity/get/", CommonController_1.default.getOpacity);
        //Series
        this.router.post("/series/create/", CommonController_1.default.createSeries);
        this.router.get("/series/get/", CommonController_1.default.getSeries);
        //Unit Type
        this.router.post("/unittype/create/", CommonController_1.default.createUnitType);
        this.router.get("/unittype/get/", CommonController_1.default.getUnitType);
        //Weight
        this.router.post("/weight/create/", CommonController_1.default.createWeight);
        this.router.get("/weight/get/", CommonController_1.default.getWeight);
        //Supplier
        this.router.post("/supplier/create/", CommonController_1.default.createSupplier);
        this.router.get("/supplier/get/", CommonController_1.default.getSupplier);
        //Category Type
        this.router.post("/categorytype/create/", CommonController_1.default.createCategoryType);
        this.router.get("/categorytype/get/", CommonController_1.default.getCategoryType);
        this.router.get("/categorytype/getById/:id", CommonController_1.default.getCategoryTypeById);
        this.router.patch("/categorytype/update/:id", CommonController_1.default.updateCategoryType);
        this.router.delete("/categorytype/delete/:id", CommonController_1.default.deleteCategoryType);
        //Category
        this.router.post("/category/create/", CommonController_1.default.createCategory);
        this.router.get("/category/get/", CommonController_1.default.getCategory);
        this.router.get("/category/getById/:id", CommonController_1.default.getCategoryById);
        this.router.get("/category/getByCategoryTypeId/:id", CommonController_1.default.getByCategoryTypeId);
        this.router.patch("/category/update/:id", CommonController_1.default.updateCategory);
        this.router.delete("/category/delete/:id", CommonController_1.default.deleteCategory);
        //sub Category
        this.router.post("/subcategory/create/", CommonController_1.default.createSubCategory);
        this.router.get("/subcategory/get/", CommonController_1.default.getSubCategory);
        this.router.get("/subcategory/getById/:id", CommonController_1.default.getSubCategoryById);
        this.router.get("/subcategory/getByCategoryId/:id", CommonController_1.default.getSubCategoryByCategoryId);
        this.router.patch("/subcategory/update/:id", CommonController_1.default.updateSubCategory);
        this.router.delete("/subcategory/delete/:id", CommonController_1.default.deleteSubCategory);
    }
}
exports.default = new CommonRouts().router;
