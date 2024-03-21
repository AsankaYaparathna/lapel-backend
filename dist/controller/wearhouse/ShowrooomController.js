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
const ShowroomRepo_1 = require("../../repository/wearhouse/ShowroomRepo");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new ShowroomRepo_1.ShowroomRepo().create(req.body);
                res.status(200).json({
                    status: true,
                    message: "successfully!",
                    data: null,
                });
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
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new ShowroomRepo_1.ShowroomRepo().update(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new ShowroomRepo_1.ShowroomRepo().delete(id);
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
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new ShowroomRepo_1.ShowroomRepo().get();
                res.status(200).json({
                    status: true,
                    message: "Successfully!",
                    data: modal,
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
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mid = parseInt(req.params["id"]);
                const modal = yield new ShowroomRepo_1.ShowroomRepo().getById(mid);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? modal : null,
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
exports.default = new UserController();
