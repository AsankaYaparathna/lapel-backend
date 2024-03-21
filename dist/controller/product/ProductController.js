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
const CustomProductRepo_1 = require("../../repository/product/CustomProductRepo");
const PackageRepo_1 = require("../../repository/product/PackageRepo");
class ProductController {
    //Custom Product
    createCustomProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CustomProductRepo_1.CustomProductRepo().create(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCustomProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CustomProductRepo_1.CustomProductRepo().get();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCustomProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CustomProductRepo_1.CustomProductRepo().getById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateCustomProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CustomProductRepo_1.CustomProductRepo().update(modal);
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
    deleteCustomProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CustomProductRepo_1.CustomProductRepo().delete(id);
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
    getSubOptionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CustomProductRepo_1.CustomProductRepo().getSubOptionById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //option
    addCustomProductOption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CustomProductRepo_1.CustomProductRepo().addOption(modal);
                res.status(200).json({
                    status: true,
                    message: "Successfully added Option!",
                    data: user,
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
    updateCustomProductOption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CustomProductRepo_1.CustomProductRepo().updateOption(modal);
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
    deleteCustomProductOption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const model = yield new CustomProductRepo_1.CustomProductRepo().deleteOption(id);
                res.status(200).json({
                    status: true,
                    message: "Successfully!",
                    data: null,
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
    getCustomProductOption(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const model = yield new CustomProductRepo_1.CustomProductRepo().getOption(id);
                res.status(200).json({
                    status: true,
                    message: "Successfully!",
                    data: model,
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
    //packages
    createPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new PackageRepo_1.PackageRepo().create(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new PackageRepo_1.PackageRepo().get();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPackageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new PackageRepo_1.PackageRepo().getById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPackageStyleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CustomProductRepo_1.CustomProductRepo().getByIdWithType(id, "style");
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPackageAccentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CustomProductRepo_1.CustomProductRepo().getByIdWithType(id, "accent");
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updatePackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new PackageRepo_1.PackageRepo().update(modal);
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
    deletePackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new PackageRepo_1.PackageRepo().delete(id);
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
exports.default = new ProductController();
