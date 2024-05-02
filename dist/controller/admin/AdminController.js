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
const AdminRepo_1 = require("../../repository/admin/AdminRepo");
class AdminController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new AdminRepo_1.AdminRepo().login(req.body.userName, req.body.password);
                if (result) {
                    res.status(200).json({
                        status: true,
                        message: "Login successfully!",
                        data: req.body.userName,
                    });
                }
                else {
                    res
                        .status(401)
                        .json({ status: false, message: "Login Failed! Password is incorrect", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new AdminRepo_1.AdminRepo().create(req.body);
                if (result) {
                    res.status(200).json({
                        status: true,
                        message: "Admin Cration successfully!",
                        data: req.body.userName,
                    });
                }
                else {
                    res
                        .status(200)
                        .json({ status: false, message: "Admin Creation Failed!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
}
exports.default = new AdminController();
