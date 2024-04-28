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
exports.WarehouseRepo = void 0;
const Images_1 = require("../../model/Common/Images");
const Wearhouse_1 = require("../../model/Warehouse/Warehouse/Wearhouse");
const WearhouseImages_1 = require("../../model/Warehouse/Warehouse/WearhouseImages");
class WarehouseRepo {
    create(warehouse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdWarehouse = yield Wearhouse_1.Wearhouse.create({
                    name: warehouse.name,
                    address: warehouse.address,
                    contactNo: warehouse.contactNo,
                    description: warehouse.description
                });
                const imgList = warehouse.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const wearhouseImages = yield WearhouseImages_1.WarehouseImage.create({
                        warehouseId: createdWarehouse.id,
                        imageId: img.id,
                    });
                }));
            }
            catch (err) {
                const result = yield Wearhouse_1.Wearhouse.findOne({ where: { name: warehouse.name } });
                if (result) {
                    throw new Error("Failed to create Warehouse! Warehouse with this name already exists!");
                }
                throw new Error("Failed to create Warehouse! | " + err.message);
            }
        });
    }
    update(warehouse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Wearhouse_1.Wearhouse.findOne({ where: { id: warehouse.id } });
                if (!result) {
                    return false;
                }
                result.name = warehouse.name;
                result.address = warehouse.address;
                result.contactNo = warehouse.contactNo;
                result.description = warehouse.description;
                result.imageList = warehouse.imageList;
                yield result.save();
                const wimgList = yield WearhouseImages_1.WarehouseImage.findAll({ where: { warehouseId: warehouse.id } });
                yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                    yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                })));
                yield WearhouseImages_1.WarehouseImage.destroy({ where: { warehouseId: warehouse.id } });
                const imgList = warehouse.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const wearhouseImages = yield WearhouseImages_1.WarehouseImage.create({
                        warehouseId: warehouse.id,
                        imageId: img.id,
                    });
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Warehouse! | " + err.message);
            }
        });
    }
    delete(warehouseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Wearhouse_1.Wearhouse.findAll({ where: { id: warehouseId } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield WearhouseImages_1.WarehouseImage.findAll({ where: { warehouseId: element.id } });
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                    })));
                    yield WearhouseImages_1.WarehouseImage.destroy({ where: { warehouseId: element.id } });
                })));
                yield Wearhouse_1.Wearhouse.destroy({ where: { id: warehouseId } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Warehouse! | " + err.message);
            }
        });
    }
    getById(warehouseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Wearhouse_1.Wearhouse.findAll({ where: { id: warehouseId } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield WearhouseImages_1.WarehouseImage.findAll({ where: { warehouseId: element.id } });
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: imgElement.imageId } });
                        imgList.push(img);
                    })));
                    const wwaerhouseTemp = {
                        id: element.id,
                        name: element.name,
                        address: JSON.parse(element.address),
                        contactNo: element.contactNo,
                        description: element.description,
                        imageList: imgList,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt,
                    };
                    Wlist.push(wwaerhouseTemp);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Warehouse! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Wearhouse_1.Wearhouse.findAll();
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield WearhouseImages_1.WarehouseImage.findAll({ where: { warehouseId: element.id } });
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: imgElement.imageId } });
                        imgList.push(img);
                    })));
                    const wwaerhouseTemp = {
                        id: element.id,
                        name: element.name,
                        address: JSON.parse(element.address),
                        contactNo: element.contactNo,
                        description: element.description,
                        imageList: imgList,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt,
                    };
                    Wlist.push(wwaerhouseTemp);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Warehouse! | " + err.message);
            }
        });
    }
}
exports.WarehouseRepo = WarehouseRepo;
