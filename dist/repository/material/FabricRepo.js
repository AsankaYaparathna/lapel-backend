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
exports.FabricRepo = void 0;
const Showroom_1 = require("../../model/Warehouse/Showroom/Showroom");
const ShowroomImages_1 = require("../../model/Warehouse/Showroom/ShowroomImages");
const Images_1 = require("../../model/Common/Images");
const Fabric_1 = require("../../model/Metirial/Fabric/Fabric");
const CustomId_1 = require("../../model/Common/CustomId");
const FabricImages_1 = require("../../model/Metirial/Fabric/FabricImages");
const RelatedFabric_1 = require("../../model/Metirial/Fabric/RelatedFabric");
const MaterialStock_1 = require("../../model/Metirial/Stock/MaterialStock");
const MainStock_1 = require("../../model/Metirial/Stock/MainStock");
const Cost_1 = require("../../model/Metirial/Cost/Cost");
const FabricItem_1 = require("../../model/Metirial/Fabric/FabricItem");
const Supplier_1 = require("../../model/Metirial/Supplier/Supplier");
const sequelize_1 = require("sequelize");
class FabricRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCustomId = yield CustomId_1.CustomId.create({
                    customId: model.customId,
                    referanceTable: "Fabric",
                });
                if (!newCustomId) {
                    throw new Error("This Custom Id is already exists! Try again");
                }
                else {
                    const newIcon = yield Images_1.Image.create({
                        imageName: model.icon.imageName,
                        imageData: model.icon.imageData,
                        imageURL: model.icon.imageURL,
                        imagelocation: model.icon.imagelocation,
                        imageDescription: model.icon.imageDescription,
                    });
                    const newQR = yield Images_1.Image.create({
                        imageName: model.qr.imageName,
                        imageData: model.qr.imageData,
                        imageURL: model.qr.imageURL,
                        imagelocation: model.qr.imagelocation,
                        imageDescription: model.qr.imageDescription,
                    });
                    const createdFabric = yield Fabric_1.Fabric.create({
                        name: model.name,
                        customId: newCustomId.customId,
                        description: model.description,
                        information: model.information,
                        listingPriority: model.listingPriority,
                        colorId: model.colorId,
                        patterrnId: model.patterrnId,
                        materialId: model.materialId,
                        characteristicsId: model.characteristicsId,
                        seriesId: model.seriesId,
                        opacity: model.opacity,
                        weightId: model.weightId,
                        unitTypeId: model.unitTypeId,
                        icon: newIcon.id,
                        qr: newQR.id,
                        levelOfSafty: model.levelOfSafty,
                        stockAlert: model.stockAlert,
                        featured: model.featured,
                        live: model.live,
                        stockMinus: model.stockMinus,
                        supplierId: model.supplierId,
                    });
                    const imgList = model.imageList;
                    imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.create({
                            imageName: element.imageName,
                            imageData: element.imageData,
                            imageURL: element.imageURL,
                            imagelocation: element.imagelocation,
                            imageDescription: element.imageDescription,
                        });
                        const modelImages = yield FabricImages_1.FabricImages.create({
                            fabricId: createdFabric.id,
                            imageId: img.id,
                        });
                    }));
                    const relatedFabList = model.relatedFabric;
                    if (relatedFabList) {
                        relatedFabList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newRelatedFabric = yield RelatedFabric_1.RelatedFabric.create({
                                fabricId: createdFabric.id,
                                relatedFabricId: element.relatedFabricId,
                            });
                        }));
                    }
                    let totalStock = 0;
                    const stocckList = model.stockData;
                    if (stocckList) {
                        stocckList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newStock = yield MaterialStock_1.MaterialStock.create({
                                customId: newCustomId.customId,
                                wearhouseId: element.wearhouseId,
                                showroomId: element.showroomId,
                                value: element.value,
                            });
                            totalStock += element.value;
                        }));
                        const mainStock = yield MainStock_1.MainStock.create({
                            customId: newCustomId.customId,
                            mainStock: totalStock,
                            liveStock: totalStock,
                            pendingStock: 0,
                            usedStock: 0,
                            totalStock: totalStock,
                        });
                    }
                    const costData = model.cost;
                    if (costData) {
                        const newCost = yield Cost_1.Cost.create({
                            customId: newCustomId.customId,
                            totalUnit: costData.totalUnit,
                            unitCost: costData.unitCost,
                            totalCost: costData.totalCost,
                        });
                    }
                    const categoryList = model.category;
                    if (categoryList) {
                        categoryList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newFabricItem = yield FabricItem_1.FabricItem.create({
                                customId: newCustomId.customId,
                                categoryId: element.categoryId,
                                currency: element.currency,
                                price: element.price,
                                visibility: element.visibility,
                                stockAlert: element.stockAlert,
                                levelOfSafty: element.levelOfSafty,
                                discount: element.discount,
                            });
                        }));
                    }
                }
            }
            catch (err) {
                const result = yield Fabric_1.Fabric.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create Fabric! Fabric with this name already exists!");
                }
                throw new Error("Failed to create Fabric! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Fabric_1.Fabric.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                else {
                    result.name = model.name;
                    result.description = model.description;
                    result.information = model.information;
                    result.listingPriority = model.listingPriority;
                    result.colorId = model.colorId;
                    result.patterrnId = model.patterrnId;
                    result.materialId = model.materialId;
                    result.characteristicsId = model.characteristicsId;
                    result.seriesId = model.seriesId;
                    result.opacity = model.opacity;
                    result.weightId = model.weightId;
                    result.unitTypeId = model.unitTypeId;
                    result.levelOfSafty = model.levelOfSafty;
                    result.stockAlert = model.stockAlert;
                    result.featured = model.featured;
                    result.live = model.live;
                    result.stockMinus = model.stockMinus;
                    result.supplierId = model.supplierId;
                    yield result.save();
                }
                const icon = yield Images_1.Image.findOne({ where: { id: result.icon } });
                if (icon) {
                    icon.imageName = model.icon.imageName;
                    icon.imageData = model.icon.imageData;
                    icon.imageURL = model.icon.imageURL;
                    icon.imagelocation = model.icon.imagelocation;
                    icon.imageDescription = model.icon.imageDescription;
                    yield icon.save();
                }
                const qr = yield Images_1.Image.findOne({ where: { id: result.qr } });
                if (qr) {
                    qr.imageName = model.qr.imageName;
                    qr.imageData = model.qr.imageData;
                    qr.imageURL = model.qr.imageURL;
                    qr.imagelocation = model.qr.imagelocation;
                    qr.imageDescription = model.qr.imageDescription;
                    yield qr.save();
                }
                const wimgList = (yield FabricImages_1.FabricImages.findAll({
                    where: { fabricId: model.id },
                }));
                yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                    yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                })));
                yield FabricImages_1.FabricImages.destroy({ where: { fabricId: model.id } });
                const imgList = model.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const modelImages = yield FabricImages_1.FabricImages.create({
                        fabricId: model.id,
                        imageId: img.id,
                    });
                }));
                yield RelatedFabric_1.RelatedFabric.destroy({ where: { fabricId: model.id } });
                const relatedFabList = model.relatedFabric;
                relatedFabList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const newRelatedFabric = yield RelatedFabric_1.RelatedFabric.create({
                        fabricId: model.id,
                        relatedFabricId: element.relatedFabricId,
                    });
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Fabric! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findAll({ where: { id: id } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = (yield ShowroomImages_1.ShowroomImages.findAll({
                        where: { showroomId: element.id },
                    }));
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                    })));
                    yield ShowroomImages_1.ShowroomImages.destroy({ where: { showroomId: element.id } });
                })));
                yield Showroom_1.Showroom.destroy({ where: { id: id } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Showroom! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Fabric_1.Fabric.findAll({ where: { id: id } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const stocData = (yield MaterialStock_1.MaterialStock.findAll({ where: { customId: element.customId } }));
                    const iconData = (yield Images_1.Image.findOne({ where: { id: element.icon } }));
                    const qrData = (yield Images_1.Image.findOne({ where: { id: element.qr } }));
                    const wimgList = (yield FabricImages_1.FabricImages.findAll({ where: { fabricId: element.id } }));
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = (yield Images_1.Image.findOne({ where: { id: imgElement.imageId } }));
                        imgList.push(img);
                    })));
                    const relatedFab = (yield RelatedFabric_1.RelatedFabric.findAll({ where: { fabricId: element.id } }));
                    const categoryData = (yield FabricItem_1.FabricItem.findAll({ where: { customId: element.customId } }));
                    const costData = (yield Cost_1.Cost.findOne({ where: { customId: element.customId } }));
                    const supplierData = (yield Supplier_1.Supplier.findOne({ where: { id: element.supplierId } }));
                    const tempModel = {
                        id: element.id,
                        name: element.name,
                        customId: element.customId,
                        description: element.description,
                        information: element.information,
                        listingPriority: element.listingPriority,
                        stockData: stocData,
                        colorId: element.colorId,
                        patterrnId: element.patterrnId,
                        materialId: element.materialId,
                        characteristicsId: element.characteristicsId,
                        seriesId: element.seriesId,
                        opacity: element.opacity,
                        weightId: element.weightId,
                        unitTypeId: element.unitTypeId,
                        icon: iconData,
                        qr: qrData,
                        imageList: imgList,
                        relatedFabric: relatedFab,
                        levelOfSafty: element.levelOfSafty,
                        stockAlert: element.stockAlert,
                        featured: element.featured,
                        live: element.live,
                        stockMinus: element.stockMinus,
                        category: categoryData,
                        supplierId: supplierData,
                        cost: costData,
                    };
                    Wlist.push(tempModel);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Fabric! | " + err.message);
            }
        });
    }
    getRelatedFabric(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Fabric_1.Fabric.findAll({
                    where: { [sequelize_1.Op.or]: [
                            { name: { [sequelize_1.Op.like]: `%${id}%` } },
                            { customId: { [sequelize_1.Op.like]: `%${id}%` } }
                        ] }
                });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const stocData = (yield MaterialStock_1.MaterialStock.findAll({ where: { customId: element.customId } }));
                    const iconData = (yield Images_1.Image.findOne({ where: { id: element.icon } }));
                    const qrData = (yield Images_1.Image.findOne({ where: { id: element.qr } }));
                    const wimgList = (yield FabricImages_1.FabricImages.findAll({ where: { fabricId: element.id } }));
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = (yield Images_1.Image.findOne({ where: { id: imgElement.imageId } }));
                        imgList.push(img);
                    })));
                    const relatedFab = (yield RelatedFabric_1.RelatedFabric.findAll({ where: { fabricId: element.id } }));
                    const categoryData = (yield FabricItem_1.FabricItem.findAll({ where: { customId: element.customId } }));
                    const costData = (yield Cost_1.Cost.findOne({ where: { customId: element.customId } }));
                    const supplierData = (yield Supplier_1.Supplier.findOne({ where: { id: element.supplierId } }));
                    const tempModel = {
                        id: element.id,
                        name: element.name,
                        customId: element.customId,
                        description: element.description,
                        information: element.information,
                        listingPriority: element.listingPriority,
                        stockData: stocData,
                        colorId: element.colorId,
                        patterrnId: element.patterrnId,
                        materialId: element.materialId,
                        characteristicsId: element.characteristicsId,
                        seriesId: element.seriesId,
                        opacity: element.opacity,
                        weightId: element.weightId,
                        unitTypeId: element.unitTypeId,
                        icon: iconData,
                        qr: qrData,
                        imageList: imgList,
                        relatedFabric: relatedFab,
                        levelOfSafty: element.levelOfSafty,
                        stockAlert: element.stockAlert,
                        featured: element.featured,
                        live: element.live,
                        stockMinus: element.stockMinus,
                        category: categoryData,
                        supplierId: supplierData,
                        cost: costData,
                    };
                    Wlist.push(tempModel);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Fabric! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Fabric_1.Fabric.findAll();
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const stocData = (yield MaterialStock_1.MaterialStock.findAll({ where: { customId: element.customId } }));
                    const iconData = (yield Images_1.Image.findOne({ where: { id: element.icon } }));
                    const qrData = (yield Images_1.Image.findOne({ where: { id: element.qr } }));
                    const wimgList = (yield FabricImages_1.FabricImages.findAll({ where: { fabricId: element.id } }));
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = (yield Images_1.Image.findOne({ where: { id: imgElement.imageId } }));
                        imgList.push(img);
                    })));
                    const relatedFab = (yield RelatedFabric_1.RelatedFabric.findAll({ where: { fabricId: element.id } }));
                    const categoryData = (yield FabricItem_1.FabricItem.findAll({ where: { customId: element.customId } }));
                    const costData = (yield Cost_1.Cost.findOne({ where: { customId: element.customId } }));
                    const supplierData = (yield Supplier_1.Supplier.findOne({ where: { id: element.supplierId } }));
                    const tempModel = {
                        id: element.id,
                        name: element.name,
                        customId: element.customId,
                        description: element.description,
                        information: element.information,
                        listingPriority: element.listingPriority,
                        stockData: stocData,
                        colorId: element.colorId,
                        patterrnId: element.patterrnId,
                        materialId: element.materialId,
                        characteristicsId: element.characteristicsId,
                        seriesId: element.seriesId,
                        opacity: element.opacity,
                        weightId: element.weightId,
                        unitTypeId: element.unitTypeId,
                        icon: iconData,
                        qr: qrData,
                        imageList: imgList,
                        relatedFabric: relatedFab,
                        levelOfSafty: element.levelOfSafty,
                        stockAlert: element.stockAlert,
                        featured: element.featured,
                        live: element.live,
                        stockMinus: element.stockMinus,
                        category: categoryData,
                        supplierId: supplierData,
                        cost: costData,
                    };
                    Wlist.push(tempModel);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Fabric! | " + err.message);
            }
        });
    }
}
exports.FabricRepo = FabricRepo;
