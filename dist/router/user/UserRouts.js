"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
const UserController_1 = __importDefault(require("../../controller/user/UserController"));
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const UserShirtMeasurementController_1 = __importDefault(require("../../controller/user/Measurements/UserShirtMeasurementController"));
const UserTrouserMeasurementController_1 = __importDefault(require("../../controller/user/Measurements/UserTrouserMeasurementController"));
const UserBlazerMeasurementController_1 = __importDefault(require("../../controller/user/Measurements/UserBlazerMeasurementController"));
const UserWaistcoatMeasurementController_1 = __importDefault(require("../../controller/user/Measurements/UserWaistcoatMeasurementController"));
const UserFullBodyMeasurementController_1 = __importDefault(require("../../controller/user/Measurements/UserFullBodyMeasurementController"));
const validate_1 = __importDefault(require("../../middleware/validate"));
const UserSchema_1 = require("../../schema/UserSchema");
class UserRouts extends BaseRouter_1.default {
    routes() {
        // Public routes
        // Protected routes
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        this.router.post("/create/", (0, validate_1.default)(UserSchema_1.createUserSchema), UserController_1.default.create);
        this.router.post("/create/resendotp/", (0, validate_1.default)(UserSchema_1.verifyMobileSchema), UserController_1.default.resendOtp);
        this.router.post("/verifyMobile/", UserController_1.default.verifyMobile);
        this.router.post("/login/", (0, validate_1.default)(UserSchema_1.loginSchema), UserController_1.default.login);
        this.router.patch("/update/:id", UserController_1.default.update);
        this.router.patch("/block/:id", UserController_1.default.block);
        this.router.delete("/delete/:id", UserController_1.default.delete);
        this.router.delete("/deleteByMobile/:id", UserController_1.default.deleteByMobile);
        this.router.get("/getById/:id", UserController_1.default.getById);
        this.router.get("/getByMobile/:id", UserController_1.default.getByMobile);
        this.router.get("/get/", UserController_1.default.get);
        this.router.post("/forgetPassword/", UserController_1.default.forgetPassword);
        this.router.post("/forgetPassword/otpSend/", UserController_1.default.forgetPasswordOtpSend);
        this.router.post("/startSession/:id", UserController_1.default.startSession);
        //profile
        this.router.patch("/update/info/:id", UserController_1.default.updateInfo);
        this.router.patch("/update/security/:id", UserController_1.default.updateSecurity);
        this.router.patch("/update/avatar/:id", UserController_1.default.updateAvatar);
        this.router.patch("/update/billing/:id", UserController_1.default.updateBillingAddress);
        this.router.patch("/update/delivery/:id", UserController_1.default.updateDeliveryAddress);
        //Measurements
        //shirt
        this.router.post("/measurements/shirt/bodyMeasurement/create/", UserShirtMeasurementController_1.default.bodyMeasurementCreate);
        this.router.patch("/measurements/shirt/bodyMeasurement/update/:id", UserShirtMeasurementController_1.default.bodyMeasurementUpdate);
        this.router.delete("/measurements/shirt/bodyMeasurement/delete/:id", UserShirtMeasurementController_1.default.bodyMeasurementDelete);
        this.router.get("/measurements/shirt/bodyMeasurement/getById/:id", UserShirtMeasurementController_1.default.bodyMeasurementGetById);
        this.router.post("/measurements/shirt/standerdSize/create/", UserShirtMeasurementController_1.default.standardSizecreate);
        this.router.patch("/measurements/shirt/standerdSize/update/:id", UserShirtMeasurementController_1.default.standardSizeUpdate);
        this.router.delete("/measurements/shirt/standerdSize/delete/:id", UserShirtMeasurementController_1.default.standardSizeDelete);
        this.router.get("/measurements/shirt/standerdSize/getById/:id", UserShirtMeasurementController_1.default.standardSizeGetById);
        this.router.post("/measurements/shirt/copyFavorites/create/", UserShirtMeasurementController_1.default.copyFavurementCreate);
        this.router.patch("/measurements/shirt/copyFavorites/update/:id", UserShirtMeasurementController_1.default.copyFavUpdate);
        this.router.delete("/measurements/shirt/copyFavorites/delete/:id", UserShirtMeasurementController_1.default.copyFavDelete);
        this.router.get("/measurements/shirt/copyFavorites/getById/:id", UserShirtMeasurementController_1.default.copyFavGetById);
        //trouser
        this.router.post("/measurements/trouser/bodyMeasurement/create/", UserTrouserMeasurementController_1.default.bodyMeasurementCreate);
        this.router.patch("/measurements/trouser/bodyMeasurement/update/:id", UserTrouserMeasurementController_1.default.bodyMeasurementUpdate);
        this.router.delete("/measurements/trouser/bodyMeasurement/delete/:id", UserTrouserMeasurementController_1.default.bodyMeasurementDelete);
        this.router.get("/measurements/trouser/bodyMeasurement/getById/:id", UserTrouserMeasurementController_1.default.bodyMeasurementGetById);
        this.router.post("/measurements/trouser/standerdSize/create/", UserTrouserMeasurementController_1.default.standardSizecreate);
        this.router.patch("/measurements/trouser/standerdSize/update/:id", UserTrouserMeasurementController_1.default.standardSizeUpdate);
        this.router.delete("/measurements/trouser/standerdSize/delete/:id", UserTrouserMeasurementController_1.default.standardSizeDelete);
        this.router.get("/measurements/trouser/standerdSize/getById/:id", UserTrouserMeasurementController_1.default.standardSizeGetById);
        this.router.post("/measurements/trouser/copyFavorites/create/", UserTrouserMeasurementController_1.default.copyFavurementCreate);
        this.router.patch("/measurements/trouser/copyFavorites/update/:id", UserTrouserMeasurementController_1.default.copyFavUpdate);
        this.router.delete("/measurements/trouser/copyFavorites/delete/:id", UserTrouserMeasurementController_1.default.copyFavDelete);
        this.router.get("/measurements/trouser/copyFavorites/getById/:id", UserTrouserMeasurementController_1.default.copyFavGetById);
        //blazer
        this.router.post("/measurements/blazer/bodyMeasurement/create/", UserBlazerMeasurementController_1.default.bodyMeasurementCreate);
        this.router.patch("/measurements/blazer/bodyMeasurement/update/:id", UserBlazerMeasurementController_1.default.bodyMeasurementUpdate);
        this.router.delete("/measurements/blazer/bodyMeasurement/delete/:id", UserBlazerMeasurementController_1.default.bodyMeasurementDelete);
        this.router.get("/measurements/blazer/bodyMeasurement/getById/:id", UserBlazerMeasurementController_1.default.bodyMeasurementGetById);
        this.router.post("/measurements/blazer/standerdSize/create/", UserBlazerMeasurementController_1.default.standardSizecreate);
        this.router.patch("/measurements/blazer/standerdSize/update/:id", UserBlazerMeasurementController_1.default.standardSizeUpdate);
        this.router.delete("/measurements/blazer/standerdSize/delete/:id", UserBlazerMeasurementController_1.default.standardSizeDelete);
        this.router.get("/measurements/blazer/standerdSize/getById/:id", UserBlazerMeasurementController_1.default.standardSizeGetById);
        //waistcoat
        this.router.post("/measurements/waistcoat/bodyMeasurement/create/", UserWaistcoatMeasurementController_1.default.bodyMeasurementCreate);
        this.router.patch("/measurements/waistcoat/bodyMeasurement/update/:id", UserWaistcoatMeasurementController_1.default.bodyMeasurementUpdate);
        this.router.delete("/measurements/waistcoat/bodyMeasurement/delete/:id", UserWaistcoatMeasurementController_1.default.bodyMeasurementDelete);
        this.router.get("/measurements/waistcoat/bodyMeasurement/getById/:id", UserWaistcoatMeasurementController_1.default.bodyMeasurementGetById);
        this.router.post("/measurements/waistcoat/standerdSize/create/", UserWaistcoatMeasurementController_1.default.standardSizecreate);
        this.router.patch("/measurements/waistcoat/standerdSize/update/:id", UserWaistcoatMeasurementController_1.default.standardSizeUpdate);
        this.router.delete("/measurements/waistcoat/standerdSize/delete/:id", UserWaistcoatMeasurementController_1.default.standardSizeDelete);
        this.router.get("/measurements/waistcoat/standerdSize/getById/:id", UserWaistcoatMeasurementController_1.default.standardSizeGetById);
        //full body
        this.router.post("/measurements/fullBody/bodyMeasurement/create/", UserFullBodyMeasurementController_1.default.bodyMeasurementCreate);
        this.router.patch("/measurements/fullBody/bodyMeasurement/update/:id", UserFullBodyMeasurementController_1.default.bodyMeasurementUpdate);
        this.router.delete("/measurements/fullBody/bodyMeasurement/delete/:id", UserFullBodyMeasurementController_1.default.bodyMeasurementDelete);
        this.router.get("/measurements/fullBody/bodyMeasurement/getById/:id", UserFullBodyMeasurementController_1.default.bodyMeasurementGetById);
        this.router.get("/measurements/getByMobile/:id", UserController_1.default.measurementGetByMobile);
    }
}
exports.default = new UserRouts().router;
