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
exports.OrderLogsRepo = void 0;
const CartOrder_1 = require("../../model/Cart/CartOrder");
const CartOrderLog_1 = require("../../model/Cart/CartOrderLog");
class OrderLogsRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCreatedModel = yield CartOrderLog_1.CartOrderLog.create({
                    orderId: model.orderId,
                    user: model.user,
                    action: model.action,
                    type: model.type,
                });
                return newCreatedModel;
            }
            catch (err) {
                throw new Error("Failed to add logs! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield CartOrderLog_1.CartOrderLog.findAll();
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield CartOrderLog_1.CartOrderLog.findAll({ where: { id: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order data! | " + err.message);
            }
        });
    }
    getByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield CartOrderLog_1.CartOrderLog.findAll({ where: { orderId: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order data! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.customerId = model.customerId;
                    newModel.firstName = model.firstName;
                    newModel.lastName = model.lastName;
                    newModel.mobile = model.mobile;
                    newModel.mobile2 = model.mobile2;
                    newModel.email = model.email;
                    newModel.billing = model.billing;
                    newModel.deliveryMethod = model.deliveryMethod;
                    newModel.notes = model.notes;
                    newModel.status = model.status;
                    newModel.orderStatus = model.orderStatus;
                    newModel.cartIdList = model.cartIdList;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order! | " + err.message);
            }
        });
    }
    delete(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrderLog_1.CartOrderLog.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                yield newModel.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order! | " + err.message);
            }
        });
    }
}
exports.OrderLogsRepo = OrderLogsRepo;
