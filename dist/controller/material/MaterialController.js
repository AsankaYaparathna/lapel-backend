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
const MaterialRepo_1 = require("../../repository/material/MaterialRepo");
const FabricRepo_1 = require("../../repository/material/FabricRepo");
class MaterialController {
    //Fabric
    createFabric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new FabricRepo_1.FabricRepo().create(req.body);
                res
                    .status(200)
                    .json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getFabric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new FabricRepo_1.FabricRepo().get();
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getFabricList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new FabricRepo_1.FabricRepo().getFabricList();
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getFabricById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new FabricRepo_1.FabricRepo().getById(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    fabricSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new FabricRepo_1.FabricRepo().fabricSearch(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getRelatedFabric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new FabricRepo_1.FabricRepo().getRelatedFabric(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateFabric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new FabricRepo_1.FabricRepo().update(modal);
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
    deleteFabric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new FabricRepo_1.FabricRepo().delete(id);
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
    //Row Material
    createRowMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new MaterialRepo_1.MaterialRepo().create(req.body);
                res
                    .status(200)
                    .json({ status: true, message: "successfully!", data: null });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getRowMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new MaterialRepo_1.MaterialRepo().get();
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    rowMaterialSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new MaterialRepo_1.MaterialRepo().rowMaterialSearch(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getRowMaterialList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new MaterialRepo_1.MaterialRepo().getRowMaterialList();
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getRowMaterialById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params["id"], 10);
                const modal = yield new MaterialRepo_1.MaterialRepo().getById(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    getRelatedRowmaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new MaterialRepo_1.MaterialRepo().getRelatedRowmaterial(id);
                res
                    .status(200)
                    .json({ status: true, message: "Successfully!", data: modal });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    updateRowMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.id = parseInt(req.params["id"], 10);
                const user = yield new MaterialRepo_1.MaterialRepo().update(modal);
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
    deleteRowMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const modal = yield new MaterialRepo_1.MaterialRepo().delete(id);
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
exports.default = new MaterialController();
