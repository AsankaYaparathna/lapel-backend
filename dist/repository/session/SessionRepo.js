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
exports.SessionRepo = void 0;
const sequelize_1 = require("sequelize");
const Cart_1 = require("../../model/Cart/Cart");
const User_1 = require("../../model/Customer/User");
class SessionRepo {
    startSession(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: {
                        [sequelize_1.Op.or]: [
                            { mobileNumber: model.id },
                            { customerId: model.id }
                        ]
                    }
                });
                if (!result) {
                    throw new Error("User not found!");
                }
                const cartModel = yield Cart_1.Cart.findAll({ where: { customerId: result.id } });
                return cartModel;
            }
            catch (err) {
                throw new Error("" + err.message);
            }
        });
    }
}
exports.SessionRepo = SessionRepo;
