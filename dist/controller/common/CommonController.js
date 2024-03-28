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
const CommonRepo_1 = require("../../repository/common/CommonRepo");
const cloudinary_1 = require("cloudinary");
class CommonController {
    //Color
    createColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createColor(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getColor();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Pattern
    createPattern(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createPattern(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getPattern(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getPattern();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Material
    createMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createMaterial(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getMaterial();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Characteristic
    createCharacteristics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createCharacteristics(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCharacteristics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getCharacteristics();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Image
    createImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createCharacteristics(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getImageById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CommonRepo_1.CommonRepo().updateImage(modal);
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
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CommonRepo_1.CommonRepo().deleteImage(id);
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
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ status: false, message: "No file uploaded" });
                }
                // Upload image to Cloudinary
                const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
                // You can handle the result, store the URL in your database, etc.
                res.status(200).json({ status: true, message: "successfully!", data: result });
            }
            catch (error) {
                return res.status(400).json({ status: false, message: "Could not upload image" });
            }
        });
    }
    //Opacity
    createOpacity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createOpacity(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getOpacity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getOpacity();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Series
    createSeries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createSeries(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getSeries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getSeries();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Unit Type
    createUnitType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createUnitType(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getUnitType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getUnitType();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Weight
    createWeight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createWeight(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getWeight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getWeight();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Supplier
    createSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createSupplier(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getSupplier();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    //Category Type
    createCategoryType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createCategoryType(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCategoryType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getCategoryType();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCategoryTypeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getCategoryTypeById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateCategoryType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CommonRepo_1.CommonRepo().updateCategoryType(modal);
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
    deleteCategoryType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CommonRepo_1.CommonRepo().deleteCategoryType(id);
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
    //Category
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createCategory(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getCategory();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getCategoryById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getByCategoryTypeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getByCategoryTypeId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CommonRepo_1.CommonRepo().updateCategory(modal);
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
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CommonRepo_1.CommonRepo().deleteCategory(id);
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
    //Sub Category
    createSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new CommonRepo_1.CommonRepo().createSubCategory(req.body);
                res.status(200).json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new CommonRepo_1.CommonRepo().getSubCategory();
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getSubCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getSubCategoryById(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getSubCategoryByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new CommonRepo_1.CommonRepo().getSubCategoryByCategoryId(id);
                res.status(200).json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new CommonRepo_1.CommonRepo().updateSubCategory(modal);
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
    deleteSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new CommonRepo_1.CommonRepo().deleteSubCategory(id);
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
exports.default = new CommonController();
