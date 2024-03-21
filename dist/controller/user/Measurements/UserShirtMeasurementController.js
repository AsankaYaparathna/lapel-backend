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
const UserShirtMeasurementRepo_1 = require("../../../repository/user/Measurements/UserShirtMeasurementRepo");
class UserShirtMeasurementController {
    //shirt - body
    bodyMeasurementCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().shirtBodyMeasurementCreate(req.body);
                res.status(200).json({
                    status: true,
                    message: "User Measurement creation successfully!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    bodyMeasurementUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = req.body;
                model.id = parseInt(req.params["id"]);
                ;
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().shirtBodyMeasurementUpdate(model);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to update!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    bodyMeasurementDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().shirtBodyMeasurementDelete(id);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to delete!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    bodyMeasurementGetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const data = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().getShirtBodyMeasurementById(id);
                res.status(200).json({
                    status: data ? true : false,
                    message: data ? "successfully!" : "Data Not Found!",
                    data: data,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //shirt - standerd
    standardSizecreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().shirtStanSizeMeasurementCreate(req.body);
                res.status(200).json({
                    status: true,
                    message: "User Measurement creation successfully!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    standardSizeUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = req.body;
                model.id = parseInt(req.params["id"]);
                ;
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().updateShirtStandardSize(model);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to update!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    standardSizeGetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const data = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().getShirtStandardSizeById(id);
                res.status(200).json({
                    status: data ? true : false,
                    message: data ? "successfully!" : "Data Not Found!",
                    data: data,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    standardSizeDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().standardSizeDelete(id);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to delete!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //shirt - copy fav
    copyFavurementCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().shirtCopyFavurementCreate(req.body);
                res.status(200).json({
                    status: true,
                    message: "User Measurement creation successfully!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    copyFavUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = req.body;
                model.id = parseInt(req.params["id"]);
                ;
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().updateShirtCopyFav(model);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement update successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to update!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    copyFavGetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const data = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().getShirtCopyFavById(id);
                res.status(200).json({
                    status: data ? true : false,
                    message: data ? "successfully!" : "Data Not Found!",
                    data: data,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    copyFavDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"]);
                const status = yield new UserShirtMeasurementRepo_1.UserShirtMeasurementRepo().deleteShirtCopyFav(id);
                if (status) {
                    res.status(200).json({ status: true, message: "User Measurement delete successfully!", data: null });
                }
                else {
                    res.status(200).json({ status: false, message: "Failed to delete!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
}
exports.default = new UserShirtMeasurementController();
