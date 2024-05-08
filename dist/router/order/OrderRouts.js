"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../../controller/auth/AuthController"));
const OrderController_1 = __importDefault(require("../../controller/cart/OrderController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class OrderRouts extends BaseRouter_1.default {
    routes() {
        const urlAuth = process.env.JWT_AUTH === "true";
        if (urlAuth) {
            this.router.use(AuthController_1.default.authenticateToken);
        }
        //order
        this.router.post("/checkout/", OrderController_1.default.checkout);
        this.router.get("/get/", OrderController_1.default.get);
        this.router.get("/getById/:id", OrderController_1.default.getById);
        this.router.get("/getByUserId/:id", OrderController_1.default.getByUserId);
        this.router.patch("/update/:id", OrderController_1.default.update);
        this.router.patch("/update/deliveryDate/:id", OrderController_1.default.updateDeleveryDate);
        this.router.patch("/update/specialNotes/:id", OrderController_1.default.addSpecialNote);
        this.router.delete("/delete/:id", OrderController_1.default.delete);
        this.router.patch("/update/payment/:id", OrderController_1.default.updatePayment);
        this.router.patch("/update/status/:id", OrderController_1.default.updateStatus);
        this.router.get("/get/ids/:id", OrderController_1.default.getIDs);
        //logs
        this.router.get("/log/get/", OrderController_1.default.logsGet);
        this.router.get("/log/getByLogId/:id", OrderController_1.default.orderLogsGet);
        this.router.get("/log/getByOrderId/:id", OrderController_1.default.orderLogsGetByOrderId);
        this.router.get("/summary/byOrderId/:id", OrderController_1.default.getOrderSummaryByUserId);
        this.router.get("/ststus", OrderController_1.default.getOrderStatus);
        this.router.post("/update/extrachages/byOrderId/:id", OrderController_1.default.updateExtraChagesAndDiscount);
        this.router.post("/advanced/updation/byOrderId/:id", OrderController_1.default.advancedUpdation);
        this.router.get("/transaction/history/byOrderId/:id", OrderController_1.default.getTransactionHistory);
        this.router.get("/getPricing/summery/byOrderId/:id", OrderController_1.default.getPricingSummary);
    }
}
exports.default = new OrderRouts().router;
