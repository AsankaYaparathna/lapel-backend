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
exports.ShopRepo = void 0;
const ShopUser_1 = require("../../model/shop/ShopUser");
const Utils_1 = require("../../utils/Utils");
class ShopRepo {
    verifyPassword(user, providedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, Utils_1.verifyPassword)(user.password, providedPassword);
        });
    }
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShopUser_1.ShopUser.findOne({
                    where: { userName: userName },
                    attributes: ['id', 'userName', 'password'],
                });
                if (!result) {
                    throw new Error("User not found!");
                }
                if (result) {
                    if ((0, Utils_1.verifyPassword)(result.password, password)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error("" + err.message);
            }
        });
    }
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encpw = (0, Utils_1.hashPassword)(model.password);
                yield ShopUser_1.ShopUser.create({
                    userName: model.userName,
                    password: encpw,
                    showroomId: model.showroomId
                });
                return true;
            }
            catch (err) {
                throw new Error("" + err.message);
            }
        });
    }
}
exports.ShopRepo = ShopRepo;
