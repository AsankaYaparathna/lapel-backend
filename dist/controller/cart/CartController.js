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
const CartRepo_1 = require("../../repository/cart/CartRepo");
class CartController {
    //cart
    finish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new CartRepo_1.CartRepo().finish(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                const user = yield new CartRepo_1.CartRepo().add(modal);
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
    updateNoofitem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                const user = yield new CartRepo_1.CartRepo().updateNoofitem(modal);
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
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CartRepo_1.CartRepo().get();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCartByUserMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CartRepo_1.CartRepo().getCartByUserMobile(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCartByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CartRepo_1.CartRepo().getCartByUserId(id);
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
                const modal = yield new CartRepo_1.CartRepo().getById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CartRepo_1.CartRepo().delete(id);
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
}
exports.default = new CartController();
