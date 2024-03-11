import BaseRoutes from "../base/BaseRouter";
import UserController from "../../controller/user/UserController";
import AuthController from "../../controller/auth/AuthController";
import UserShirtMeasurementController from "../../controller/user/Measurements/UserShirtMeasurementController";
import UserTrouserMeasurementController from "../../controller/user/Measurements/UserTrouserMeasurementController";
import UserBlazerMeasurementController from "../../controller/user/Measurements/UserBlazerMeasurementController";
import UserWaistcoatMeasurementController from "../../controller/user/Measurements/UserWaistcoatMeasurementController";
import UserFullBodyMeasurementController from "../../controller/user/Measurements/UserFullBodyMeasurementController";
import validate from "../../middleware/validate";
import { billingSchema, changePasswordSchema, createUserSchema, loginSchema, verifyMobileSchema, verifyOtpSchema } from "../../schema/UserSchema";

class UserRouts extends BaseRoutes{
    public routes(): void {
        // Public routes
       
        // Protected routes
        //this.router.use(AuthController.authenticateToken);
        this.router.post("/create/", validate(createUserSchema), UserController.create);
        this.router.post("/create/resendotp/", validate(verifyMobileSchema), UserController.resendOtp);
        this.router.post("/verifyMobile/", validate(verifyOtpSchema), UserController.verifyMobile);
        this.router.post("/login/",validate(loginSchema), UserController.login);
        
        this.router.patch("/update/:id", UserController.update);
        this.router.patch("/block/:id", UserController.block);
        this.router.delete("/delete/:id", UserController.delete);
        this.router.delete("/deleteByMobile/:id", UserController.deleteByMobile);
        this.router.get("/getById/:id", UserController.getById);
        this.router.get("/getByMobile/:id", UserController.getByMobile);
        this.router.get("/get/", UserController.get);
        
        this.router.post("/forgetPassword/", UserController.forgetPassword);
        this.router.post("/forgetPassword/otpSend/", UserController.forgetPasswordOtpSend);

        this.router.post("/startSession/:id", UserController.startSession);


        //profile
        this.router.patch("/update/info/:id", UserController.updateInfo);
        this.router.patch("/update/security/:id", UserController.updateSecurity);
        this.router.patch("/update/avatar/:id", UserController.updateAvatar);
        this.router.patch("/update/billing/:id", UserController.updateBillingAddress);
        this.router.patch("/update/delivery/:id", UserController.updateDeliveryAddress);

        //Measurements

        //shirt
        this.router.post("/measurements/shirt/bodyMeasurement/create/", UserShirtMeasurementController.bodyMeasurementCreate);
        this.router.patch("/measurements/shirt/bodyMeasurement/update/:id", UserShirtMeasurementController.bodyMeasurementUpdate);
        this.router.delete("/measurements/shirt/bodyMeasurement/delete/:id", UserShirtMeasurementController.bodyMeasurementDelete);
        this.router.get("/measurements/shirt/bodyMeasurement/getById/:id", UserShirtMeasurementController.bodyMeasurementGetById);
        this.router.post("/measurements/shirt/standerdSize/create/", UserShirtMeasurementController.standardSizecreate);
        this.router.patch("/measurements/shirt/standerdSize/update/:id", UserShirtMeasurementController.standardSizeUpdate);
        this.router.delete("/measurements/shirt/standerdSize/delete/:id", UserShirtMeasurementController.standardSizeDelete);
        this.router.get("/measurements/shirt/standerdSize/getById/:id", UserShirtMeasurementController.standardSizeGetById);
        this.router.post("/measurements/shirt/copyFavorites/create/", UserShirtMeasurementController.copyFavurementCreate);
        this.router.patch("/measurements/shirt/copyFavorites/update/:id", UserShirtMeasurementController.copyFavUpdate);
        this.router.delete("/measurements/shirt/copyFavorites/delete/:id", UserShirtMeasurementController.copyFavDelete);
        this.router.get("/measurements/shirt/copyFavorites/getById/:id", UserShirtMeasurementController.copyFavGetById);

        //trouser
        this.router.post("/measurements/trouser/bodyMeasurement/create/",     UserTrouserMeasurementController.bodyMeasurementCreate);
        this.router.patch("/measurements/trouser/bodyMeasurement/update/:id",  UserTrouserMeasurementController.bodyMeasurementUpdate);
        this.router.delete("/measurements/trouser/bodyMeasurement/delete/:id",  UserTrouserMeasurementController.bodyMeasurementDelete);
        this.router.get("/measurements/trouser/bodyMeasurement/getById/:id", UserTrouserMeasurementController.bodyMeasurementGetById);
        this.router.post("/measurements/trouser/standerdSize/create/",        UserTrouserMeasurementController.standardSizecreate);
        this.router.patch("/measurements/trouser/standerdSize/update/:id",     UserTrouserMeasurementController.standardSizeUpdate);
        this.router.delete("/measurements/trouser/standerdSize/delete/:id",     UserTrouserMeasurementController.standardSizeDelete);
        this.router.get("/measurements/trouser/standerdSize/getById/:id",    UserTrouserMeasurementController.standardSizeGetById);
        this.router.post("/measurements/trouser/copyFavorites/create/",       UserTrouserMeasurementController.copyFavurementCreate);
        this.router.patch("/measurements/trouser/copyFavorites/update/:id",    UserTrouserMeasurementController.copyFavUpdate);
        this.router.delete("/measurements/trouser/copyFavorites/delete/:id",    UserTrouserMeasurementController.copyFavDelete);
        this.router.get("/measurements/trouser/copyFavorites/getById/:id",   UserTrouserMeasurementController.copyFavGetById);

        //blazer
        this.router.post("/measurements/blazer/bodyMeasurement/create/",    UserBlazerMeasurementController.bodyMeasurementCreate);
        this.router.patch("/measurements/blazer/bodyMeasurement/update/:id", UserBlazerMeasurementController.bodyMeasurementUpdate);
        this.router.delete("/measurements/blazer/bodyMeasurement/delete/:id", UserBlazerMeasurementController.bodyMeasurementDelete);
        this.router.get("/measurements/blazer/bodyMeasurement/getById/:id",UserBlazerMeasurementController.bodyMeasurementGetById);
        this.router.post("/measurements/blazer/standerdSize/create/",       UserBlazerMeasurementController.standardSizecreate);
        this.router.patch("/measurements/blazer/standerdSize/update/:id",    UserBlazerMeasurementController.standardSizeUpdate);
        this.router.delete("/measurements/blazer/standerdSize/delete/:id",    UserBlazerMeasurementController.standardSizeDelete);
        this.router.get("/measurements/blazer/standerdSize/getById/:id",   UserBlazerMeasurementController.standardSizeGetById);

        //waistcoat
        this.router.post("/measurements/waistcoat/bodyMeasurement/create/",     UserWaistcoatMeasurementController.bodyMeasurementCreate);
        this.router.patch("/measurements/waistcoat/bodyMeasurement/update/:id",  UserWaistcoatMeasurementController.bodyMeasurementUpdate);
        this.router.delete("/measurements/waistcoat/bodyMeasurement/delete/:id",  UserWaistcoatMeasurementController.bodyMeasurementDelete);
        this.router.get("/measurements/waistcoat/bodyMeasurement/getById/:id", UserWaistcoatMeasurementController.bodyMeasurementGetById);
        this.router.post("/measurements/waistcoat/standerdSize/create/",        UserWaistcoatMeasurementController.standardSizecreate);
        this.router.patch("/measurements/waistcoat/standerdSize/update/:id",     UserWaistcoatMeasurementController.standardSizeUpdate);
        this.router.delete("/measurements/waistcoat/standerdSize/delete/:id",     UserWaistcoatMeasurementController.standardSizeDelete);
        this.router.get("/measurements/waistcoat/standerdSize/getById/:id",    UserWaistcoatMeasurementController.standardSizeGetById);

        //full body
        this.router.post("/measurements/fullBody/bodyMeasurement/create/",     UserFullBodyMeasurementController.bodyMeasurementCreate);
        this.router.patch("/measurements/fullBody/bodyMeasurement/update/:id",  UserFullBodyMeasurementController.bodyMeasurementUpdate);
        this.router.delete("/measurements/fullBody/bodyMeasurement/delete/:id",  UserFullBodyMeasurementController.bodyMeasurementDelete);
        this.router.get("/measurements/fullBody/bodyMeasurement/getById/:id", UserFullBodyMeasurementController.bodyMeasurementGetById);

        this.router.get("/measurements/getByMobile/:id", UserController.measurementGetByMobile);
    }
}

export default new UserRouts().router