"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderRepo_1 = require("../../repository/order/OrderRepo");
const OrderLogsRepo_1 = require("../../repository/order/OrderLogsRepo");
class OrderController {
    //order
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new OrderRepo_1.OrderRepo().checkout(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new OrderRepo_1.OrderRepo().get();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getIDs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getIDs(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getByUserId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                const user = yield new OrderRepo_1.OrderRepo().update(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null, });
            }
        });
    }
    updateDeleveryDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = req.body;
                modal.id = id;
                const user = yield new OrderRepo_1.OrderRepo().updateDeliveryDate(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null, });
            }
        });
    }
    addSpecialNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = req.body;
                modal.id = id;
                const user = yield new OrderRepo_1.OrderRepo().addSpecialNote(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null, });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                const user = yield new OrderRepo_1.OrderRepo().updatePayment(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null, });
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                const user = yield new OrderRepo_1.OrderRepo().updateStatus(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null, });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new OrderRepo_1.OrderRepo().delete(id);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? id : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    shopCheckout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new OrderRepo_1.OrderRepo().shopCheckout(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    setOff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new OrderRepo_1.OrderRepo().shopCheckout(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getInvoiceByCartId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getInvoiceByCartId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getByInvId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getByInvId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getByInvNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new OrderRepo_1.OrderRepo().getByInvNo(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //logs
    logsGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new OrderLogsRepo_1.OrderLogsRepo().get();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    orderLogsGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderLogsRepo_1.OrderLogsRepo().getById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    orderLogsGetByOrderId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderLogsRepo_1.OrderLogsRepo().getByOrderId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getOrderSummaryByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getOrderSummaryByUserId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getTransactionHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getOrderSummaryByUserId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new OrderRepo_1.OrderRepo().getOrderStatus();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateExtraChagesAndDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const result = yield new OrderRepo_1.OrderRepo().updateExtraChagesAndDiscount(req.body, id);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    advancedUpdation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const result = yield new OrderRepo_1.OrderRepo().advancedUpdation(req.body, id);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPricingSummary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new OrderRepo_1.OrderRepo().getOrderSummaryByUserId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
}
exports.default = new OrderController();
