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
exports.PackageRepo = void 0;
const Images_1 = require("../../model/Common/Images");
const CustomProduct_1 = require("../../model/Product/Custom Product/CustomProduct");
const CstomProductPackages_1 = require("../../model/Product/Packages/CstomProductPackages");
const PackageImages_1 = require("../../model/Product/Packages/PackageImages");
const PackageProfImages_1 = require("../../model/Product/Packages/PackageProfImages");
const PackageElement_1 = require("../../model/Product/Packages/PackageElement");
const MeasurementPackage_1 = require("../../model/Product/Packages/MeasurementPackage");
const CustomProductOption_1 = require("../../model/Product/Custom Product/CustomProductOption");
class PackageRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CstomProductPackages_1.CstomProductPackages.findOne({ where: { title: model.title }, });
                if (result) {
                    throw new Error("Failed to create Custom Product Package! Custom Product Package with this name already exists!");
                }
                const icon = yield Images_1.Image.create({
                    imageName: model.icon.imageName,
                    imageData: model.icon.imageData,
                    imageURL: model.icon.imageURL,
                    imagelocation: model.icon.imagelocation,
                    imageDescription: model.icon.imageDescription,
                });
                const newCreatedModel = yield CstomProductPackages_1.CstomProductPackages.create({
                    title: model.title,
                    description: model.description,
                    productionTime: model.productionTime,
                    price: model.price,
                    listingPriority: model.listingPriority,
                    isLive: model.isLive,
                    icon: icon.id,
                    isActive: true,
                });
                if (newCreatedModel) {
                    const imgList = model.images;
                    if (imgList) {
                        imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const img = yield Images_1.Image.create({
                                imageName: element.imageName,
                                imageData: element.imageData,
                                imageURL: element.imageURL,
                                imagelocation: element.imagelocation,
                                imageDescription: element.imageDescription,
                            });
                            const modelImages = yield PackageImages_1.PackageImages.create({
                                packageId: newCreatedModel.id,
                                imageId: img.id,
                            });
                        }));
                    }
                    const imgList2 = model.professionalImages;
                    if (imgList2) {
                        imgList2.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const img = yield Images_1.Image.create({
                                imageName: element.imageName,
                                imageData: element.imageData,
                                imageURL: element.imageURL,
                                imagelocation: element.imagelocation,
                                imageDescription: element.imageDescription,
                            });
                            const modelImages = yield PackageProfImages_1.PackageProfImages.create({
                                packageId: newCreatedModel.id,
                                imageId: img.id,
                            });
                        }));
                    }
                    const pkgElement = model.elements;
                    if (pkgElement) {
                        pkgElement.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newPkgElement = yield PackageElement_1.PackageElement.create({
                                packageId: newCreatedModel.id,
                                optionId: element.optionId,
                                customProdId: element.customProdId,
                                customProdName: element.customProdName,
                                frontViewOrder: element.frontViewOrder,
                                backViewOrder: element.backViewOrder
                            });
                        }));
                    }
                    const pkgMeasurement = model.measurementPackage;
                    if (pkgMeasurement) {
                        pkgMeasurement.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newPkgMea = yield MeasurementPackage_1.MeasurementPackage.create({
                                packageId: newCreatedModel.id,
                                optionId: element.optionId
                            });
                        }));
                    }
                }
            }
            catch (err) {
                throw new Error("Failed to create Custom Product Package! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CstomProductPackages_1.CstomProductPackages.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.title = model.title;
                    newModel.description = model.description;
                    newModel.productionTime = model.productionTime;
                    newModel.price = model.price;
                    newModel.listingPriority = model.listingPriority;
                    newModel.isLive = model.isLive;
                    newModel.isActive = true;
                    newModel.isActive = true;
                    yield newModel.save();
                    const icon = yield Images_1.Image.findOne({ where: { id: newModel.icon } });
                    if (icon) {
                        icon.imageName = model.icon.imageName;
                        icon.imageData = model.icon.imageData;
                        icon.imageURL = model.icon.imageURL;
                        icon.imagelocation = model.icon.imagelocation;
                        icon.imageDescription = model.icon.imageDescription;
                    }
                    const imgListdata = yield PackageImages_1.PackageImages.findAll({ where: { packageId: model.id }, });
                    yield PackageImages_1.PackageImages.destroy({ where: { packageId: model.id } });
                    if (imgListdata) {
                        yield imgListdata.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            yield Images_1.Image.destroy({ where: { id: element.imageId } });
                        }));
                    }
                    const imgList = model.images;
                    if (imgList) {
                        imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const img = yield Images_1.Image.create({
                                imageName: element.imageName,
                                imageData: element.imageData,
                                imageURL: element.imageURL,
                                imagelocation: element.imagelocation,
                                imageDescription: element.imageDescription,
                            });
                            const modelImages = yield PackageImages_1.PackageImages.create({
                                packageId: model.id,
                                imageId: img.id,
                            });
                        }));
                    }
                    const imgListdataProf = yield PackageProfImages_1.PackageProfImages.findAll({ where: { packageId: model.id }, });
                    yield PackageProfImages_1.PackageProfImages.destroy({ where: { packageId: model.id } });
                    if (imgListdataProf) {
                        yield imgListdataProf.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            yield Images_1.Image.destroy({ where: { id: element.imageId } });
                        }));
                    }
                    const imgList2 = model.professionalImages;
                    if (imgList2) {
                        imgList2.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const img = yield Images_1.Image.create({
                                imageName: element.imageName,
                                imageData: element.imageData,
                                imageURL: element.imageURL,
                                imagelocation: element.imagelocation,
                                imageDescription: element.imageDescription,
                            });
                            const modelImages = yield PackageProfImages_1.PackageProfImages.create({
                                packageId: model.id,
                                imageId: img.id,
                            });
                        }));
                    }
                    yield PackageElement_1.PackageElement.destroy({ where: { packageId: model.id } });
                    const pkgElement = model.elements;
                    if (pkgElement) {
                        pkgElement.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newPkgElement = yield PackageElement_1.PackageElement.create({
                                packageId: model.id,
                                optionId: element.optionId,
                                frontViewOrder: element.frontViewOrder,
                                backViewOrder: element.backViewOrder
                            });
                        }));
                    }
                    yield MeasurementPackage_1.MeasurementPackage.destroy({ where: { packageId: model.id } });
                    const pkgMeasurement = model.measurementPackage;
                    if (pkgMeasurement) {
                        pkgMeasurement.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newPkgMea = yield MeasurementPackage_1.MeasurementPackage.create({
                                packageId: model.id,
                                optionId: element.optionId
                            });
                        }));
                    }
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Custom Product Packages! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id } });
                const newModel = yield CstomProductPackages_1.CstomProductPackages.findOne({ where: { id: id }, });
                if (!newModel) {
                    throw new Error("Data not found!");
                }
                yield CstomProductPackages_1.CstomProductPackages.destroy({ where: { id: id } });
                yield Images_1.Image.destroy({ where: { id: newModel.icon } });
                const imgListdata = yield PackageImages_1.PackageImages.findAll({ where: { packageId: id }, });
                yield PackageImages_1.PackageImages.destroy({ where: { packageId: id } });
                if (imgListdata) {
                    yield imgListdata.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: element.imageId } });
                    }));
                }
                const imgListdataProf = yield PackageProfImages_1.PackageProfImages.findAll({ where: { packageId: id }, });
                yield PackageProfImages_1.PackageProfImages.destroy({ where: { packageId: id } });
                if (imgListdataProf) {
                    yield imgListdataProf.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: element.imageId } });
                    }));
                }
                yield PackageElement_1.PackageElement.destroy({ where: { packageId: id } });
                yield MeasurementPackage_1.MeasurementPackage.destroy({ where: { packageId: id } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Custom Product Package! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProduct = [];
                const customProductPkg = yield CstomProductPackages_1.CstomProductPackages.findAll({ where: { id: id } });
                if (!customProductPkg || customProductPkg.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProductPkg.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const pkgElement = yield PackageElement_1.PackageElement.findAll({ where: { packageId: element.id } });
                    const pkgMeasurement = yield MeasurementPackage_1.MeasurementPackage.findAll({ where: { packageId: element.id } });
                    const icon = yield Images_1.Image.findOne({ where: { id: element.icon } });
                    const pkgImages = [];
                    const pkgImgList = yield PackageImages_1.PackageImages.findAll({ where: { packageId: element.id }, });
                    yield Promise.all(pkgImgList.map((elementPkgImg) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: elementPkgImg.imageId }, });
                        if (img) {
                            pkgImages.push(img);
                        }
                    })));
                    const pkgProfImages = [];
                    const pkgImgList2 = yield PackageProfImages_1.PackageProfImages.findAll({ where: { packageId: element.id }, });
                    yield Promise.all(pkgImgList2.map((elementPkgImg) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: elementPkgImg.imageId }, });
                        if (img) {
                            pkgProfImages.push(img);
                        }
                    })));
                    const temp = {
                        id: element.id,
                        title: element.title,
                        description: element.description,
                        elements: pkgElement,
                        measurementPackage: pkgMeasurement,
                        productionTime: element.productionTime,
                        price: element.price,
                        listingPriority: element.listingPriority,
                        isLive: element.isLive,
                        icon: icon ? icon : new Images_1.Image,
                        images: pkgImages,
                        professionalImages: pkgProfImages,
                        isActive: element.isActive
                    };
                    tempCuProduct.push(temp);
                })));
                return yield tempCuProduct;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product Package! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProduct = [];
                const customProductPkg = yield CstomProductPackages_1.CstomProductPackages.findAll();
                if (!customProductPkg || customProductPkg.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProductPkg.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const pkgElement = yield PackageElement_1.PackageElement.findAll({ where: { packageId: element.id } });
                    const pkgMeasurement = yield MeasurementPackage_1.MeasurementPackage.findAll({ where: { packageId: element.id } });
                    const icon = yield Images_1.Image.findOne({ where: { id: element.icon } });
                    const pkgImages = [];
                    const pkgImgList = yield PackageImages_1.PackageImages.findAll({ where: { packageId: element.id }, });
                    yield Promise.all(pkgImgList.map((elementPkgImg) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: elementPkgImg.imageId }, });
                        if (img) {
                            pkgImages.push(img);
                        }
                    })));
                    const pkgProfImages = [];
                    const pkgImgList2 = yield PackageProfImages_1.PackageProfImages.findAll({ where: { packageId: element.id }, });
                    yield Promise.all(pkgImgList2.map((elementPkgImg) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: elementPkgImg.imageId }, });
                        if (img) {
                            pkgProfImages.push(img);
                        }
                    })));
                    const temp = {
                        id: element.id,
                        title: element.title,
                        description: element.description,
                        elements: pkgElement,
                        measurementPackage: pkgMeasurement,
                        productionTime: element.productionTime,
                        price: element.price,
                        listingPriority: element.listingPriority,
                        isLive: element.isLive,
                        icon: icon ? icon : new Images_1.Image,
                        images: pkgImages,
                        professionalImages: pkgProfImages,
                        isActive: element.isActive
                    };
                    tempCuProduct.push(temp);
                })));
                return yield tempCuProduct;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getElement(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = model;
                const elementModel = [];
                yield Promise.all(data.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const customProduct = yield CustomProduct_1.CustomProduct.findOne({ where: { name: element.element } });
                    if (!customProduct) {
                        throw new Error("Data not found!");
                    }
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { customProductId: customProduct.id }, order: [["id", "ASC"]] });
                    optionData.map((elementOp) => __awaiter(this, void 0, void 0, function* () {
                        const newElement = {
                            opttionId: elementOp.id,
                            optionName: elementOp.name,
                            element: customProduct.name,
                            frontFullOrder: { All: optionData.length, order: elementOp.frontViewOrder },
                            backFullOrder: { All: optionData.length, order: elementOp.backViewOrder }
                        };
                        elementModel.push(newElement);
                    }));
                })));
                return yield elementModel;
            }
            catch (err) {
                throw new Error("Failed to get Elements! | " + err.message);
            }
        });
    }
}
exports.PackageRepo = PackageRepo;
