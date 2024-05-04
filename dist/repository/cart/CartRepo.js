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
exports.CartRepo = void 0;
const Cart_1 = require("../../model/Cart/Cart");
const User_1 = require("../../model/Customer/User");
class CartRepo {
    finish(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCreatedModel = yield Cart_1.Cart.create({
                    customerId: model.customerId,
                    packageId: model.packageId,
                    status: false,
                    styleList: model.styleList,
                });
                return newCreatedModel;
            }
            catch (err) {
                throw new Error("Failed to add cart! | " + err.message);
            }
        });
    }
    add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield Cart_1.Cart.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.name = model.name;
                    newModel.measurement = model.measurement;
                    newModel.note = model.note;
                    newModel.noteImageUrl = model.noteImageUrl;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed add to cart! | " + err.message);
            }
        });
    }
    updateNoofitem(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield Cart_1.Cart.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.noOfItems = model.noOfItems;
                    newModel.subTotal = model.subTotal;
                    newModel.shippingCost = model.shippingCost;
                    newModel.totalAmmount = model.totalAmmount;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update no of items! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield Cart_1.Cart.findOne({ where: { id: id } });
                if (!newModel) {
                    throw new Error("Data not found!");
                }
                yield Cart_1.Cart.destroy({ where: { id: id } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Custom Product Package! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield Cart_1.Cart.findAll({ where: { id: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get cart data! | " + err.message);
            }
        });
    }
    getCartByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield Cart_1.Cart.findAll({ where: { customerId: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get cart data! | " + err.message);
            }
        });
    }
    getCartByUserMobile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbUser = yield User_1.User.findOne({ where: { mobileNumber: id } });
                if (!dbUser) {
                    throw new Error("User not found!");
                }
                console.log(dbUser);
                const dbModel = yield Cart_1.Cart.findAll({ where: { customerId: dbUser.id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get cart data! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield Cart_1.Cart.findAll();
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
}
exports.CartRepo = CartRepo;
