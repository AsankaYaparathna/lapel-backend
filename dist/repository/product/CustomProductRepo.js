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
exports.CustomProductRepo = void 0;
const Images_1 = require("../../model/Common/Images");
const CustomProduct_1 = require("../../model/Product/Custom Product/CustomProduct");
const CustomProductOption_1 = require("../../model/Product/Custom Product/CustomProductOption");
const OptionHidenRule_1 = require("../../model/Product/Custom Product/OptionHidenRule");
const SubOption_1 = require("../../model/Product/Custom Product/SubOption");
const SubOptionHidenRule_1 = require("../../model/Product/Custom Product/SubOptionHidenRule");
const SubOptionFabric_1 = require("../../model/Product/Custom Product/SubOptionFabric");
class CustomProductRepo {
    create(model) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CustomProduct_1.CustomProduct.findOne({
                    where: { categoryName: model.categoryName },
                });
                if (result) {
                    throw new Error("Failed to create Custom Product! Custom Product with this name already exists!");
                }
                // const customProduct = await CustomProduct.create({
                //   categoryId: model.categoryId,
                //   categoryName: model.categoryName,
                //   categoryTypeId: model.categoryTypeId,
                //   isActive: true,
                // });
                const customProduct = yield CustomProduct_1.CustomProduct.create({
                    name: (_a = model.name) !== null && _a !== void 0 ? _a : "",
                    customId: (_b = model.customId) !== null && _b !== void 0 ? _b : "",
                    description: (_c = model.description) !== null && _c !== void 0 ? _c : "",
                    information: (_d = model.information) !== null && _d !== void 0 ? _d : "",
                    relatedProdId: (_e = model.relatedProdId) !== null && _e !== void 0 ? _e : [],
                    live: (_f = model.live) !== null && _f !== void 0 ? _f : false,
                    featured: (_g = model.featured) !== null && _g !== void 0 ? _g : false,
                    categoryId: (_h = model.categoryId) !== null && _h !== void 0 ? _h : "",
                    subCategoryId: (_j = model.subCategoryId) !== null && _j !== void 0 ? _j : "",
                    categoryName: (_k = model.categoryName) !== null && _k !== void 0 ? _k : "",
                    categoryTypeId: (_l = model.categoryTypeId) !== null && _l !== void 0 ? _l : "",
                    patterrnId: (_m = model.patterrnId) !== null && _m !== void 0 ? _m : null,
                    colorId: (_o = model.colorId) !== null && _o !== void 0 ? _o : null,
                    characteristicsId: (_p = model.characteristicsId) !== null && _p !== void 0 ? _p : null,
                    materialId: (_q = model.materialId) !== null && _q !== void 0 ? _q : null,
                    packageId: (_r = model.packageId) !== null && _r !== void 0 ? _r : "",
                    opacity: (_s = model.opacity) !== null && _s !== void 0 ? _s : null,
                    weightId: (_t = model.weightId) !== null && _t !== void 0 ? _t : null,
                    icon: (_u = model.icon) !== null && _u !== void 0 ? _u : "",
                    qr: (_v = model.qr) !== null && _v !== void 0 ? _v : "",
                    images: (_w = model.images) !== null && _w !== void 0 ? _w : [],
                    isActive: true,
                });
                if (customProduct) {
                    const optionModel = model.option;
                    var i = 0;
                    optionModel.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const opModel = model.option[i];
                        const newOptionImage = yield Images_1.Image.create({
                            imageName: opModel.image.imageName,
                            imageData: opModel.image.imageData,
                            imageURL: opModel.image.imageURL,
                            imagelocation: opModel.image.imagelocation,
                            imageDescription: opModel.image.imageDescription,
                        });
                        const customProductOption = yield CustomProductOption_1.CustomProductOption.create({
                            customProductId: customProduct.id,
                            name: element.name,
                            image: newOptionImage.id,
                            style: element.style,
                            contrast: element.contrast,
                            accent: element.accent,
                            optionGroup: element.optionGroup,
                            hidden: element.hidden,
                            front: element.front,
                            back: element.back,
                            description: element.description,
                            frontViewOrder: element.frontViewOrder,
                            backViewOrder: element.backViewOrder,
                        });
                        const optionHiddenRule = element.hideRules;
                        optionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newOptionImage = yield OptionHidenRule_1.OptionHidenRule.create({
                                optionId: customProductOption.id,
                                ruleId: element.id,
                            });
                        }));
                        var j = 0;
                        const subOption = opModel.subOptions;
                        subOption.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const subOptionModel = opModel.subOptions[j];
                            const image = yield Images_1.Image.create({
                                imageName: subOptionModel.image.imageName,
                                imageData: subOptionModel.image.imageData,
                                imageURL: subOptionModel.image.imageURL,
                                imagelocation: subOptionModel.image.imagelocation,
                                imageDescription: subOptionModel.image.imageDescription,
                            });
                            const closeUpImage = yield Images_1.Image.create({
                                imageName: subOptionModel.closeUpImage.imageName,
                                imageData: subOptionModel.closeUpImage.imageData,
                                imageURL: subOptionModel.closeUpImage.imageURL,
                                imagelocation: subOptionModel.closeUpImage.imagelocation,
                                imageDescription: subOptionModel.closeUpImage.imageDescription,
                            });
                            const subOption = yield SubOption_1.SubOption.create({
                                optionId: customProductOption.id,
                                title: element.title,
                                price: element.price,
                                viewStockItem: element.viewStockItem,
                                description: element.description,
                                image: image.id,
                                closeUpImage: closeUpImage.id,
                                order: element.order,
                                isDefault: element.isDefault,
                            });
                            if (element.isDefault) {
                                const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                    where: { id: customProductOption.id },
                                });
                                if (opNew) {
                                    opNew.defaultLoadingOption = subOption.id;
                                    yield opNew.save();
                                }
                            }
                            const subOptionHiddenRule = subOptionModel.hideRules;
                            subOptionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                const newOptionImage = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                    subOptionId: subOption.id,
                                    ruleId: element.id,
                                });
                            }));
                            var k = 0;
                            const subOptionFabric = subOptionModel.fabric;
                            subOptionFabric.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                const subOptionFabricModel = subOptionModel.fabric[k];
                                const front = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.front.imageName,
                                    imageData: subOptionFabricModel.front.imageData,
                                    imageURL: subOptionFabricModel.front.imageURL,
                                    imagelocation: subOptionFabricModel.front.imagelocation,
                                    imageDescription: subOptionFabricModel.front.imageDescription,
                                });
                                const frontFull = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.frontFull.imageName,
                                    imageData: subOptionFabricModel.frontFull.imageData,
                                    imageURL: subOptionFabricModel.frontFull.imageURL,
                                    imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                    imageDescription: subOptionFabricModel.frontFull.imageDescription,
                                });
                                const back = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.back.imageName,
                                    imageData: subOptionFabricModel.back.imageData,
                                    imageURL: subOptionFabricModel.back.imageURL,
                                    imagelocation: subOptionFabricModel.back.imagelocation,
                                    imageDescription: subOptionFabricModel.back.imageDescription,
                                });
                                const backFull = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.backFull.imageName,
                                    imageData: subOptionFabricModel.backFull.imageData,
                                    imageURL: subOptionFabricModel.backFull.imageURL,
                                    imagelocation: subOptionFabricModel.backFull.imagelocation,
                                    imageDescription: subOptionFabricModel.backFull.imageDescription,
                                });
                                const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                    subOptionId: subOption.id,
                                    customId: element.customId,
                                    name: element.name,
                                    front: front.id,
                                    frontFull: frontFull.id,
                                    back: back.id,
                                    backFull: backFull.id,
                                });
                                k++;
                            }));
                            j++;
                        }));
                        i++;
                    }));
                }
            }
            catch (err) {
                const result = yield CustomProduct_1.CustomProduct.findOne({
                    where: { categoryName: model.categoryName },
                });
                if (result) {
                    throw new Error("Failed to create Custom Product! Custom Product with this name already exists!");
                }
                throw new Error("Failed to create Custom Product! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findOne({
                    where: { id: model.id },
                });
                if (!customProduct) {
                    return false;
                }
                else {
                    customProduct.categoryId = model.categoryId;
                    customProduct.categoryName = model.categoryName;
                    customProduct.categoryTypeId = model.categoryTypeId;
                    yield customProduct.save();
                    const optionModel = model.option;
                    var i = 0;
                    yield optionModel.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                            where: { customProductId: element.customProductId },
                        });
                        const opModel = model.option[i];
                        if (!resultOption) {
                            const newOptionImage = yield Images_1.Image.create({
                                imageName: opModel.image.imageName,
                                imageData: opModel.image.imageData,
                                imageURL: opModel.image.imageURL,
                                imagelocation: opModel.image.imagelocation,
                                imageDescription: opModel.image.imageDescription,
                            });
                            const customProductOption = yield CustomProductOption_1.CustomProductOption.create({
                                customProductId: customProduct.id,
                                name: element.name,
                                image: newOptionImage.id,
                                style: element.style,
                                contrast: element.contrast,
                                accent: element.accent,
                                optionGroup: element.optionGroup,
                                hidden: element.hidden,
                                front: element.front,
                                back: element.back,
                                description: element.description,
                                frontViewOrder: element.frontViewOrder,
                                backViewOrder: element.backViewOrder,
                            });
                            const optionHiddenRule = element.hideRules;
                            yield optionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                const newOptionImage = yield OptionHidenRule_1.OptionHidenRule.create({
                                    optionId: customProductOption.id,
                                    ruleId: element.id,
                                });
                            }));
                            var j = 0;
                            const subOption = opModel.subOptions;
                            yield subOption.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                const subOptionModel = opModel.subOptions[j];
                                const image = yield Images_1.Image.create({
                                    imageName: subOptionModel.image.imageName,
                                    imageData: subOptionModel.image.imageData,
                                    imageURL: subOptionModel.image.imageURL,
                                    imagelocation: subOptionModel.image.imagelocation,
                                    imageDescription: subOptionModel.image.imageDescription,
                                });
                                const closeUpImage = yield Images_1.Image.create({
                                    imageName: subOptionModel.closeUpImage.imageName,
                                    imageData: subOptionModel.closeUpImage.imageData,
                                    imageURL: subOptionModel.closeUpImage.imageURL,
                                    imagelocation: subOptionModel.closeUpImage.imagelocation,
                                    imageDescription: subOptionModel.closeUpImage.imageDescription,
                                });
                                const subOption = yield SubOption_1.SubOption.create({
                                    optionId: customProductOption.id,
                                    title: element.title,
                                    price: element.price,
                                    viewStockItem: element.viewStockItem,
                                    description: element.description,
                                    image: image.id,
                                    closeUpImage: closeUpImage.id,
                                    order: element.order,
                                    isDefault: element.isDefault,
                                });
                                if (element.isDefault) {
                                    const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                        where: { id: customProductOption.id },
                                    });
                                    if (opNew) {
                                        opNew.defaultLoadingOption = subOption.id;
                                        yield opNew.save();
                                    }
                                }
                                const subOptionHiddenRule = subOptionModel.hideRules;
                                yield subOptionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                    const newOptionImage = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                        subOptionId: subOption.id,
                                        ruleId: element.id,
                                    });
                                }));
                                var k = 0;
                                const subOptionFabric = subOptionModel.fabric;
                                yield subOptionFabric.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                    const subOptionFabricModel = subOptionModel.fabric[k];
                                    const front = yield Images_1.Image.create({
                                        imageName: subOptionFabricModel.front.imageName,
                                        imageData: subOptionFabricModel.front.imageData,
                                        imageURL: subOptionFabricModel.front.imageURL,
                                        imagelocation: subOptionFabricModel.front.imagelocation,
                                        imageDescription: subOptionFabricModel.front.imageDescription,
                                    });
                                    const frontFull = yield Images_1.Image.create({
                                        imageName: subOptionFabricModel.frontFull.imageName,
                                        imageData: subOptionFabricModel.frontFull.imageData,
                                        imageURL: subOptionFabricModel.frontFull.imageURL,
                                        imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                        imageDescription: subOptionFabricModel.frontFull.imageDescription,
                                    });
                                    const back = yield Images_1.Image.create({
                                        imageName: subOptionFabricModel.back.imageName,
                                        imageData: subOptionFabricModel.back.imageData,
                                        imageURL: subOptionFabricModel.back.imageURL,
                                        imagelocation: subOptionFabricModel.back.imagelocation,
                                        imageDescription: subOptionFabricModel.back.imageDescription,
                                    });
                                    const backFull = yield Images_1.Image.create({
                                        imageName: subOptionFabricModel.backFull.imageName,
                                        imageData: subOptionFabricModel.backFull.imageData,
                                        imageURL: subOptionFabricModel.backFull.imageURL,
                                        imagelocation: subOptionFabricModel.backFull.imagelocation,
                                        imageDescription: subOptionFabricModel.backFull.imageDescription,
                                    });
                                    const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                        subOptionId: subOption.id,
                                        customId: element.customId,
                                        name: element.name,
                                        front: front.id,
                                        frontFull: frontFull.id,
                                        back: back.id,
                                        backFull: backFull.id,
                                    });
                                    k++;
                                }));
                                j++;
                            }));
                        }
                        else {
                            const resultOptionImage = yield Images_1.Image.findOne({
                                where: { id: resultOption.image },
                            });
                            if (resultOptionImage) {
                                resultOptionImage.imageName = opModel.image.imageName;
                                resultOptionImage.imageData = opModel.image.imageData;
                                resultOptionImage.imageURL = opModel.image.imageURL;
                                resultOptionImage.imagelocation = opModel.image.imagelocation;
                                resultOptionImage.imageDescription =
                                    opModel.image.imageDescription;
                                yield resultOptionImage.save();
                            }
                            resultOption.customProductId = customProduct.id;
                            resultOption.name = element.name;
                            //resultOption.image = resultOption.image;
                            resultOption.style = element.style;
                            resultOption.contrast = element.contrast;
                            resultOption.accent = element.accent;
                            resultOption.optionGroup = element.optionGroup;
                            resultOption.hidden = element.hidden;
                            resultOption.front = element.front;
                            resultOption.back = element.back;
                            resultOption.description = element.description;
                            resultOption.frontViewOrder = element.frontViewOrder;
                            resultOption.backViewOrder = element.backViewOrder;
                            yield resultOption.save();
                            yield OptionHidenRule_1.OptionHidenRule.destroy({
                                where: { optionId: resultOption.id },
                            });
                            const optionHiddenRule = element.hideRules;
                            yield optionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                const newoptionHiddenRule = yield OptionHidenRule_1.OptionHidenRule.create({
                                    optionId: resultOption.id,
                                    ruleId: element.id,
                                });
                            }));
                            var j = 0;
                            const subOpModel = opModel.subOptions;
                            const subOption = subOpModel;
                            yield subOption.forEach((subElement) => __awaiter(this, void 0, void 0, function* () {
                                const resultSubOption = yield SubOption_1.SubOption.findOne({
                                    where: { id: subElement.id },
                                });
                                const subOptionModel = subOpModel[j];
                                if (!resultSubOption) {
                                    const image = yield Images_1.Image.create({
                                        imageName: subOptionModel.image.imageName,
                                        imageData: subOptionModel.image.imageData,
                                        imageURL: subOptionModel.image.imageURL,
                                        imagelocation: subOptionModel.image.imagelocation,
                                        imageDescription: subOptionModel.image.imageDescription,
                                    });
                                    const closeUpImage = yield Images_1.Image.create({
                                        imageName: subOptionModel.closeUpImage.imageName,
                                        imageData: subOptionModel.closeUpImage.imageData,
                                        imageURL: subOptionModel.closeUpImage.imageURL,
                                        imagelocation: subOptionModel.closeUpImage.imagelocation,
                                        imageDescription: subOptionModel.closeUpImage.imageDescription,
                                    });
                                    const subOption = yield SubOption_1.SubOption.create({
                                        optionId: resultOption.id,
                                        title: subOptionModel.title,
                                        price: subOptionModel.price,
                                        viewStockItem: subOptionModel.viewStockItem,
                                        description: subOptionModel.description,
                                        image: image.id,
                                        closeUpImage: closeUpImage.id,
                                        order: subOptionModel.order,
                                        isDefault: subOptionModel.isDefault,
                                    });
                                    if (subOptionModel.isDefault) {
                                        const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                            where: { id: resultOption.id },
                                        });
                                        if (opNew) {
                                            opNew.defaultLoadingOption = subOption.id;
                                            yield opNew.save();
                                        }
                                    }
                                    const subOptionHiddenRule = subOptionModel.hideRules;
                                    yield subOptionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                        const newOptionImage = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                            subOptionId: subOption.id,
                                            ruleId: element.id,
                                        });
                                    }));
                                    var k = 0;
                                    const subOptionFabric = subOptionModel.fabric;
                                    yield subOptionFabric.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                        const subOptionFabricModel = subOptionModel.fabric[k];
                                        const front = yield Images_1.Image.create({
                                            imageName: subOptionFabricModel.front.imageName,
                                            imageData: subOptionFabricModel.front.imageData,
                                            imageURL: subOptionFabricModel.front.imageURL,
                                            imagelocation: subOptionFabricModel.front.imagelocation,
                                            imageDescription: subOptionFabricModel.front.imageDescription,
                                        });
                                        const frontFull = yield Images_1.Image.create({
                                            imageName: subOptionFabricModel.frontFull.imageName,
                                            imageData: subOptionFabricModel.frontFull.imageData,
                                            imageURL: subOptionFabricModel.frontFull.imageURL,
                                            imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                            imageDescription: subOptionFabricModel.frontFull.imageDescription,
                                        });
                                        const back = yield Images_1.Image.create({
                                            imageName: subOptionFabricModel.back.imageName,
                                            imageData: subOptionFabricModel.back.imageData,
                                            imageURL: subOptionFabricModel.back.imageURL,
                                            imagelocation: subOptionFabricModel.back.imagelocation,
                                            imageDescription: subOptionFabricModel.back.imageDescription,
                                        });
                                        const backFull = yield Images_1.Image.create({
                                            imageName: subOptionFabricModel.backFull.imageName,
                                            imageData: subOptionFabricModel.backFull.imageData,
                                            imageURL: subOptionFabricModel.backFull.imageURL,
                                            imagelocation: subOptionFabricModel.backFull.imagelocation,
                                            imageDescription: subOptionFabricModel.backFull.imageDescription,
                                        });
                                        const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                            subOptionId: subOption.id,
                                            customId: element.customId,
                                            name: element.name,
                                            front: front.id,
                                            frontFull: frontFull.id,
                                            back: back.id,
                                            backFull: backFull.id,
                                        });
                                        k++;
                                    }));
                                }
                                else {
                                    const image = yield Images_1.Image.findOne({
                                        where: { id: resultSubOption.image },
                                    });
                                    if (image) {
                                        image.imageName = subOptionModel.image.imageName;
                                        image.imageData = subOptionModel.image.imageData;
                                        image.imageURL = subOptionModel.image.imageURL;
                                        image.imagelocation = subOptionModel.image.imagelocation;
                                        image.imageDescription =
                                            subOptionModel.image.imageDescription;
                                        yield image.save();
                                    }
                                    const closeUpImage = yield Images_1.Image.findOne({
                                        where: { id: resultSubOption.closeUpImage },
                                    });
                                    if (closeUpImage) {
                                        closeUpImage.imageName =
                                            subOptionModel.closeUpImage.imageName;
                                        closeUpImage.imageData =
                                            subOptionModel.closeUpImage.imageData;
                                        closeUpImage.imageURL = subOptionModel.closeUpImage.imageURL;
                                        closeUpImage.imagelocation =
                                            subOptionModel.closeUpImage.imagelocation;
                                        closeUpImage.imageDescription =
                                            subOptionModel.closeUpImage.imageDescription;
                                        yield closeUpImage.save();
                                    }
                                    resultSubOption.optionId = resultOption.id;
                                    resultSubOption.title = subElement.title;
                                    resultSubOption.price = subElement.price;
                                    resultSubOption.viewStockItem = subElement.viewStockItem;
                                    resultSubOption.description = subElement.description;
                                    // resultSubOption.image = subElement.image;
                                    // resultSubOption.closeUpImage = subElement.closeUpImage;
                                    resultSubOption.order = subElement.order;
                                    resultSubOption.isDefault = subElement.isDefault;
                                    yield resultSubOption.save();
                                    if (subElement.isDefault) {
                                        const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                            where: { id: resultOption.id },
                                        });
                                        if (opNew) {
                                            opNew.defaultLoadingOption = resultSubOption.id;
                                            yield opNew.save();
                                        }
                                    }
                                    yield SubOptionHidenRule_1.SubOptionHidenRule.destroy({
                                        where: { subOptionId: resultSubOption.id },
                                    });
                                    const subOptionHidenRule = subOptionModel.hideRules;
                                    yield subOptionHidenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                                        const newsubOptionHidenRule = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                            subOptionId: subElement.id,
                                            ruleId: element.id,
                                        });
                                    }));
                                    var k = 0;
                                    const subOptionFabric = subOptionModel.fabric;
                                    yield subOptionFabric.forEach((fabElement) => __awaiter(this, void 0, void 0, function* () {
                                        const subOptionFabricModel = subOptionModel.fabric[k];
                                        const resultSubOptionFab = yield SubOptionFabric_1.SubOptionFabric.findOne({
                                            where: { id: fabElement.id },
                                        });
                                        if (!resultSubOptionFab) {
                                            const front = yield Images_1.Image.create({
                                                imageName: subOptionFabricModel.front.imageName,
                                                imageData: subOptionFabricModel.front.imageData,
                                                imageURL: subOptionFabricModel.front.imageURL,
                                                imagelocation: subOptionFabricModel.front.imagelocation,
                                                imageDescription: subOptionFabricModel.front.imageDescription,
                                            });
                                            const frontFull = yield Images_1.Image.create({
                                                imageName: subOptionFabricModel.frontFull.imageName,
                                                imageData: subOptionFabricModel.frontFull.imageData,
                                                imageURL: subOptionFabricModel.frontFull.imageURL,
                                                imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                                imageDescription: subOptionFabricModel.frontFull.imageDescription,
                                            });
                                            const back = yield Images_1.Image.create({
                                                imageName: subOptionFabricModel.back.imageName,
                                                imageData: subOptionFabricModel.back.imageData,
                                                imageURL: subOptionFabricModel.back.imageURL,
                                                imagelocation: subOptionFabricModel.back.imagelocation,
                                                imageDescription: subOptionFabricModel.back.imageDescription,
                                            });
                                            const backFull = yield Images_1.Image.create({
                                                imageName: subOptionFabricModel.backFull.imageName,
                                                imageData: subOptionFabricModel.backFull.imageData,
                                                imageURL: subOptionFabricModel.backFull.imageURL,
                                                imagelocation: subOptionFabricModel.backFull.imagelocation,
                                                imageDescription: subOptionFabricModel.backFull.imageDescription,
                                            });
                                            const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                                subOptionId: subOptionModel.id,
                                                customId: subOptionModel.customId,
                                                name: element.name,
                                                front: front.id,
                                                frontFull: frontFull.id,
                                                back: back.id,
                                                backFull: backFull.id,
                                            });
                                        }
                                        else {
                                            const front = yield Images_1.Image.findOne({
                                                where: { id: resultSubOptionFab.front },
                                            });
                                            if (front) {
                                                front.imageName = subOptionFabricModel.front.imageName;
                                                front.imageData = subOptionFabricModel.front.imageData;
                                                front.imageURL = subOptionFabricModel.front.imageURL;
                                                front.imagelocation =
                                                    subOptionFabricModel.front.imagelocation;
                                                front.imageDescription =
                                                    subOptionFabricModel.front.imageDescription;
                                                yield front.save();
                                            }
                                            const frontFull = yield Images_1.Image.findOne({
                                                where: { id: resultSubOptionFab.frontFull },
                                            });
                                            if (frontFull) {
                                                frontFull.imageName =
                                                    subOptionFabricModel.frontFull.imageName;
                                                frontFull.imageData =
                                                    subOptionFabricModel.frontFull.imageData;
                                                frontFull.imageURL =
                                                    subOptionFabricModel.frontFull.imageURL;
                                                frontFull.imagelocation =
                                                    subOptionFabricModel.frontFull.imagelocation;
                                                frontFull.imageDescription =
                                                    subOptionFabricModel.frontFull.imageDescription;
                                                yield frontFull.save();
                                            }
                                            const back = yield Images_1.Image.findOne({
                                                where: { id: resultSubOptionFab.back },
                                            });
                                            if (back) {
                                                back.imageName = subOptionFabricModel.back.imageName;
                                                back.imageData = subOptionFabricModel.back.imageData;
                                                back.imageURL = subOptionFabricModel.back.imageURL;
                                                back.imagelocation =
                                                    subOptionFabricModel.back.imagelocation;
                                                back.imageDescription =
                                                    subOptionFabricModel.back.imageDescription;
                                                yield back.save();
                                            }
                                            const backFull = yield Images_1.Image.findOne({
                                                where: { id: resultSubOptionFab.backFull },
                                            });
                                            if (backFull) {
                                                backFull.imageName =
                                                    subOptionFabricModel.backFull.imageName;
                                                backFull.imageData =
                                                    subOptionFabricModel.backFull.imageData;
                                                backFull.imageURL =
                                                    subOptionFabricModel.backFull.imageURL;
                                                backFull.imagelocation =
                                                    subOptionFabricModel.backFull.imagelocation;
                                                backFull.imageDescription =
                                                    subOptionFabricModel.backFull.imageDescription;
                                                yield backFull.save();
                                            }
                                            resultSubOptionFab.subOptionId = subElement.id;
                                            resultSubOptionFab.customId = fabElement.customId;
                                            resultSubOptionFab.name = fabElement.name;
                                            // resultSubOptionFab.front = front ? front.id : 0;
                                            // resultSubOptionFab.frontFull = frontFull ? frontFull.id : 0;
                                            // resultSubOptionFab.back = back ? back.id : 0;
                                            // resultSubOptionFab.backFull = backFull ? backFull.id : 0;
                                            yield resultSubOptionFab.save();
                                        }
                                        k++;
                                    }));
                                }
                                j++;
                            }));
                        }
                        i++;
                    }));
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Custom Product! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id } });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield CustomProduct_1.CustomProduct.destroy({ where: { id: id } });
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                        where: { customProductId: elementCP.id },
                    });
                    yield CustomProductOption_1.CustomProductOption.destroy({
                        where: { customProductId: elementCP.id },
                    });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: elementCPO.image } });
                        yield OptionHidenRule_1.OptionHidenRule.destroy({
                            where: { optionId: elementCPO.id },
                        });
                        const subOptionData = yield SubOption_1.SubOption.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield SubOption_1.SubOption.destroy({ where: { optionId: elementCPO.id } });
                        yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                            yield Images_1.Image.destroy({ where: { id: elementCPSO.image } });
                            yield Images_1.Image.destroy({
                                where: { id: elementCPSO.closeUpImage },
                            });
                            yield SubOptionHidenRule_1.SubOptionHidenRule.destroy({
                                where: { subOptionId: elementCPSO.id },
                            });
                            const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield SubOptionFabric_1.SubOptionFabric.destroy({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                                yield Images_1.Image.destroy({
                                    where: { id: elementCPSOF.front },
                                });
                                yield Images_1.Image.destroy({
                                    where: { id: elementCPSOF.frontFull },
                                });
                                yield Images_1.Image.destroy({ where: { id: elementCPSOF.back } });
                                yield Images_1.Image.destroy({
                                    where: { id: elementCPSOF.backFull },
                                });
                            })));
                        })));
                    })));
                })));
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Custom Product! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProduct = [];
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id } });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const tempCuProOp = [];
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                        where: { customProductId: elementCP.id },
                    });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const optionImage = (yield Images_1.Image.findOne({
                            where: { id: elementCPO.image },
                        }));
                        const tempCuProSubOp = [];
                        const subOptionData = yield SubOption_1.SubOption.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                            const subimage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.image },
                            }));
                            const subcloseUpImage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.closeUpImage },
                            }));
                            const tempCuProSubOpFab = [];
                            const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                                const front = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.front },
                                }));
                                const frontFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.frontFull },
                                }));
                                const back = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.back },
                                }));
                                const backFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.backFull },
                                }));
                                const tempFab = {
                                    id: elementCPSOF.id,
                                    customId: elementCPSOF.customId,
                                    name: elementCPSOF.name,
                                    front: front,
                                    frontFull: frontFull,
                                    back: back,
                                    backFull: backFull,
                                };
                                tempCuProSubOpFab.push(tempFab);
                            })));
                            const tempCuProSubOpHR = [];
                            const subOptionHideRuleData = yield SubOptionHidenRule_1.SubOptionHidenRule.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                                const temp = {
                                    id: elementCPSOFHR.id,
                                    subOptionId: elementCPSOFHR.subOptionId,
                                    ruleId: elementCPSOFHR.ruleId,
                                };
                                tempCuProSubOpHR.push(temp);
                            })));
                            const temp = {
                                id: elementCPSO.id,
                                title: elementCPSO.title,
                                price: elementCPSO.price,
                                viewStockItem: elementCPSO.viewStockItem,
                                description: elementCPSO.description,
                                image: subimage,
                                closeUpImage: subcloseUpImage,
                                hideRules: tempCuProSubOpHR,
                                fabric: tempCuProSubOpFab,
                            };
                            tempCuProSubOp.push(temp);
                        })));
                        const tempCuProOpHR = [];
                        const subOptionHideRuleData = yield OptionHidenRule_1.OptionHidenRule.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                            const temp = {
                                id: elementCPSOFHR.id,
                                optionId: elementCPSOFHR.optionId,
                                ruleId: elementCPSOFHR.ruleId,
                            };
                            tempCuProOpHR.push(temp);
                        })));
                        const temp = {
                            id: elementCPO.id,
                            name: elementCPO.name,
                            image: optionImage,
                            style: elementCPO.style,
                            accent: elementCPO.accent,
                            optionGroup: elementCPO.optionGroup,
                            hidden: elementCPO.hidden,
                            front: elementCPO.front,
                            back: elementCPO.back,
                            description: elementCPO.description,
                            hideRules: tempCuProOpHR,
                            subOptions: tempCuProSubOp,
                        };
                        tempCuProOp.push(temp);
                    })));
                    // const temp: newCustomProd = {
                    //   id: elementCP.id,
                    //   categoryId: elementCP.categoryId,
                    //   categoryName: elementCP.categoryName,
                    //   categoryTypeId: elementCP.categoryTypeId,
                    //   options: tempCuProOp,
                    //   isActive: elementCP.isActive,
                    // };
                    const temp = {
                        id: elementCP.id,
                        categoryId: elementCP.categoryId,
                        categoryName: elementCP.categoryName,
                        categoryTypeId: elementCP.categoryTypeId,
                        options: tempCuProOp,
                        isActive: elementCP.isActive,
                        customId: elementCP.customId,
                        description: elementCP.description,
                        information: elementCP.information,
                        relatedProdId: elementCP.relatedProdId,
                        live: elementCP.live,
                        featured: elementCP.featured,
                        subCategoryId: elementCP.subCategoryId,
                        patterrnId: elementCP.patterrnId,
                        colorId: elementCP.colorId,
                        characteristicsId: elementCP.characteristicsId,
                        materialId: elementCP.materialId,
                        packageId: elementCP.packageId,
                        opacity: elementCP.opacity,
                        weightId: elementCP.weightId,
                        icon: elementCP.icon,
                        qr: elementCP.qr,
                        images: elementCP.images,
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
    getByIdWithType(id, typeName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProduct = [];
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id } });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const tempCuProOp = [];
                    var styleV = typeName === "style";
                    var accentV = typeName === "accent";
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                        where: { customProductId: elementCP.id, style: styleV, accent: accentV }
                    });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const optionImage = (yield Images_1.Image.findOne({
                            where: { id: elementCPO.image },
                        }));
                        const tempCuProSubOp = [];
                        const subOptionData = yield SubOption_1.SubOption.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                            const subimage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.image },
                            }));
                            const subcloseUpImage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.closeUpImage },
                            }));
                            const tempCuProSubOpFab = [];
                            const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                                const front = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.front },
                                }));
                                const frontFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.frontFull },
                                }));
                                const back = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.back },
                                }));
                                const backFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.backFull },
                                }));
                                const tempFab = {
                                    id: elementCPSOF.id,
                                    customId: elementCPSOF.customId,
                                    name: elementCPSOF.name,
                                    front: front,
                                    frontFull: frontFull,
                                    back: back,
                                    backFull: backFull,
                                };
                                tempCuProSubOpFab.push(tempFab);
                            })));
                            const tempCuProSubOpHR = [];
                            const subOptionHideRuleData = yield SubOptionHidenRule_1.SubOptionHidenRule.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                                const temp = {
                                    id: elementCPSOFHR.id,
                                    subOptionId: elementCPSOFHR.subOptionId,
                                    ruleId: elementCPSOFHR.ruleId,
                                };
                                tempCuProSubOpHR.push(temp);
                            })));
                            const temp = {
                                id: elementCPSO.id,
                                title: elementCPSO.title,
                                price: elementCPSO.price,
                                viewStockItem: elementCPSO.viewStockItem,
                                description: elementCPSO.description,
                                image: subimage,
                                closeUpImage: subcloseUpImage,
                                hideRules: tempCuProSubOpHR,
                                fabric: tempCuProSubOpFab,
                            };
                            tempCuProSubOp.push(temp);
                        })));
                        const tempCuProOpHR = [];
                        const subOptionHideRuleData = yield OptionHidenRule_1.OptionHidenRule.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                            const temp = {
                                id: elementCPSOFHR.id,
                                optionId: elementCPSOFHR.optionId,
                                ruleId: elementCPSOFHR.ruleId,
                            };
                            tempCuProOpHR.push(temp);
                        })));
                        const temp = {
                            id: elementCPO.id,
                            name: elementCPO.name,
                            image: optionImage,
                            style: elementCPO.style,
                            accent: elementCPO.accent,
                            optionGroup: elementCPO.optionGroup,
                            hidden: elementCPO.hidden,
                            front: elementCPO.front,
                            back: elementCPO.back,
                            description: elementCPO.description,
                            hideRules: tempCuProOpHR,
                            subOptions: tempCuProSubOp,
                        };
                        tempCuProOp.push(temp);
                    })));
                    // const temp: newCustomProd = {
                    //   id: elementCP.id,
                    //   categoryId: elementCP.categoryId,
                    //   categoryName: elementCP.categoryName,
                    //   categoryTypeId: elementCP.categoryTypeId,
                    //   options: tempCuProOp,
                    //   isActive: elementCP.isActive,
                    // };
                    const temp = {
                        id: elementCP.id,
                        categoryId: elementCP.categoryId,
                        categoryName: elementCP.categoryName,
                        categoryTypeId: elementCP.categoryTypeId,
                        options: tempCuProOp,
                        isActive: elementCP.isActive,
                        customId: elementCP.customId,
                        description: elementCP.description,
                        information: elementCP.information,
                        relatedProdId: elementCP.relatedProdId,
                        live: elementCP.live,
                        featured: elementCP.featured,
                        subCategoryId: elementCP.subCategoryId,
                        patterrnId: elementCP.patterrnId,
                        colorId: elementCP.colorId,
                        characteristicsId: elementCP.characteristicsId,
                        materialId: elementCP.materialId,
                        packageId: elementCP.packageId,
                        opacity: elementCP.opacity,
                        weightId: elementCP.weightId,
                        icon: elementCP.icon,
                        qr: elementCP.qr,
                        images: elementCP.images,
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
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProduct = [];
                const customProduct = yield CustomProduct_1.CustomProduct.findAll();
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const tempCuProOp = [];
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                        where: { customProductId: elementCP.id },
                    });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const optionImage = (yield Images_1.Image.findOne({
                            where: { id: elementCPO.image },
                        }));
                        const tempCuProSubOp = [];
                        const subOptionData = yield SubOption_1.SubOption.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                            const subimage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.image },
                            }));
                            const subcloseUpImage = (yield Images_1.Image.findOne({
                                where: { id: elementCPSO.closeUpImage },
                            }));
                            const tempCuProSubOpFab = [];
                            const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                                const front = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.front },
                                }));
                                const frontFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.frontFull },
                                }));
                                const back = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.back },
                                }));
                                const backFull = (yield Images_1.Image.findOne({
                                    where: { id: elementCPSOF.backFull },
                                }));
                                const tempFab = {
                                    id: elementCPSOF.id,
                                    customId: elementCPSOF.customId,
                                    name: elementCPSOF.name,
                                    front: front,
                                    frontFull: frontFull,
                                    back: back,
                                    backFull: backFull,
                                };
                                tempCuProSubOpFab.push(tempFab);
                            })));
                            const tempCuProSubOpHR = [];
                            const subOptionHideRuleData = yield SubOptionHidenRule_1.SubOptionHidenRule.findAll({
                                where: { subOptionId: elementCPSO.id },
                            });
                            yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                                const temp = {
                                    id: elementCPSOFHR.id,
                                    subOptionId: elementCPSOFHR.subOptionId,
                                    ruleId: elementCPSOFHR.ruleId,
                                };
                                tempCuProSubOpHR.push(temp);
                            })));
                            const temp = {
                                id: elementCPSO.id,
                                title: elementCPSO.title,
                                price: elementCPSO.price,
                                viewStockItem: elementCPSO.viewStockItem,
                                description: elementCPSO.description,
                                image: subimage,
                                closeUpImage: subcloseUpImage,
                                hideRules: tempCuProSubOpHR,
                                fabric: tempCuProSubOpFab,
                                order: elementCPSO.order,
                            };
                            tempCuProSubOp.push(temp);
                        })));
                        const tempCuProOpHR = [];
                        const subOptionHideRuleData = yield OptionHidenRule_1.OptionHidenRule.findAll({
                            where: { optionId: elementCPO.id },
                        });
                        yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                            const temp = {
                                id: elementCPSOFHR.id,
                                optionId: elementCPSOFHR.optionId,
                                ruleId: elementCPSOFHR.ruleId,
                            };
                            tempCuProOpHR.push(temp);
                        })));
                        const temp = {
                            id: elementCPO.id,
                            name: elementCPO.name,
                            image: optionImage,
                            style: elementCPO.style,
                            accent: elementCPO.accent,
                            optionGroup: elementCPO.optionGroup,
                            hidden: elementCPO.hidden,
                            front: elementCPO.front,
                            back: elementCPO.back,
                            description: elementCPO.description,
                            hideRules: tempCuProOpHR,
                            subOptions: tempCuProSubOp,
                            defaultLoadingOption: elementCPO.defaultLoadingOption,
                        };
                        tempCuProOp.push(temp);
                    })));
                    // const temp: newCustomProd = {
                    //   id: elementCP.id,
                    //   categoryId: elementCP.categoryId,
                    //   categoryName: elementCP.categoryName,
                    //   categoryTypeId: elementCP.categoryTypeId,
                    //   options: tempCuProOp,
                    //   isActive: elementCP.isActive,
                    // };
                    const temp = {
                        id: elementCP.id,
                        categoryId: elementCP.categoryId,
                        categoryName: elementCP.categoryName,
                        categoryTypeId: elementCP.categoryTypeId,
                        options: tempCuProOp,
                        isActive: elementCP.isActive,
                        customId: elementCP.customId,
                        description: elementCP.description,
                        information: elementCP.information,
                        relatedProdId: elementCP.relatedProdId,
                        live: elementCP.live,
                        featured: elementCP.featured,
                        subCategoryId: elementCP.subCategoryId,
                        patterrnId: elementCP.patterrnId,
                        colorId: elementCP.colorId,
                        characteristicsId: elementCP.characteristicsId,
                        materialId: elementCP.materialId,
                        packageId: elementCP.packageId,
                        opacity: elementCP.opacity,
                        weightId: elementCP.weightId,
                        icon: elementCP.icon,
                        qr: elementCP.qr,
                        images: elementCP.images,
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
    getSubOptionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subOptionData = yield SubOption_1.SubOption.findOne({ where: { id: id } });
                if (!subOptionData) {
                    throw new Error("Data not found!");
                }
                const cuProSubOp = [];
                const subimage = (yield Images_1.Image.findOne({
                    where: { id: subOptionData.image },
                }));
                const subcloseUpImage = (yield Images_1.Image.findOne({
                    where: { id: subOptionData.closeUpImage },
                }));
                const tempCuProSubOpFab = [];
                const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                    where: { subOptionId: subOptionData.id },
                });
                yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                    const front = (yield Images_1.Image.findOne({
                        where: { id: elementCPSOF.front },
                    }));
                    const frontFull = (yield Images_1.Image.findOne({
                        where: { id: elementCPSOF.frontFull },
                    }));
                    const back = (yield Images_1.Image.findOne({
                        where: { id: elementCPSOF.back },
                    }));
                    const backFull = (yield Images_1.Image.findOne({
                        where: { id: elementCPSOF.backFull },
                    }));
                    const tempFab = {
                        id: elementCPSOF.id,
                        customId: elementCPSOF.customId,
                        name: elementCPSOF.name,
                        front: front,
                        frontFull: frontFull,
                        back: back,
                        backFull: backFull,
                    };
                    tempCuProSubOpFab.push(tempFab);
                })));
                const tempCuProSubOpHR = [];
                const subOptionHideRuleData = yield SubOptionHidenRule_1.SubOptionHidenRule.findAll({
                    where: { subOptionId: subOptionData.id },
                });
                yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                    const temp = {
                        id: elementCPSOFHR.id,
                        subOptionId: elementCPSOFHR.subOptionId,
                        ruleId: elementCPSOFHR.ruleId,
                    };
                    tempCuProSubOpHR.push(temp);
                })));
                const temp = {
                    id: subOptionData.id,
                    title: subOptionData.title,
                    price: subOptionData.price,
                    viewStockItem: subOptionData.viewStockItem,
                    description: subOptionData.description,
                    image: subimage,
                    closeUpImage: subcloseUpImage,
                    hideRules: tempCuProSubOpHR,
                    fabric: tempCuProSubOpFab,
                };
                cuProSubOp.push(temp);
                return yield cuProSubOp;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    addOption(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findOne({
                    where: { id: model.id },
                });
                if (!customProduct) {
                    throw new Error("Data Not Found!");
                }
                else {
                    const optionModel = model.option;
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                        where: { name: optionModel.name },
                    });
                    const opModel = model.option;
                    if (resultOption) {
                        throw new Error("This option is already exists!");
                    }
                    const newOptionImage = yield Images_1.Image.create({
                        imageName: opModel.image.imageName,
                        imageData: opModel.image.imageData,
                        imageURL: opModel.image.imageURL,
                        imagelocation: opModel.image.imagelocation,
                        imageDescription: opModel.image.imageDescription,
                    });
                    const customProductOption = yield CustomProductOption_1.CustomProductOption.create({
                        customProductId: customProduct.id,
                        name: optionModel.name,
                        image: newOptionImage.id,
                        style: optionModel.style,
                        contrast: optionModel.contrast,
                        accent: optionModel.accent,
                        optionGroup: optionModel.optionGroup,
                        hidden: optionModel.hidden,
                        front: optionModel.front,
                        back: optionModel.back,
                        description: optionModel.description,
                        frontViewOrder: optionModel.frontViewOrder,
                        backViewOrder: optionModel.backViewOrder,
                    });
                    const optionHiddenRule = optionModel.hideRules;
                    yield optionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const newOptionImage = yield OptionHidenRule_1.OptionHidenRule.create({
                            optionId: customProductOption.id,
                            ruleId: element.id,
                        });
                    }));
                    var j = 0;
                    const subOption = opModel.subOptions;
                    yield subOption.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const subOptionModel = opModel.subOptions[j];
                        const image = yield Images_1.Image.create({
                            imageName: subOptionModel.image.imageName,
                            imageData: subOptionModel.image.imageData,
                            imageURL: subOptionModel.image.imageURL,
                            imagelocation: subOptionModel.image.imagelocation,
                            imageDescription: subOptionModel.image.imageDescription,
                        });
                        const closeUpImage = yield Images_1.Image.create({
                            imageName: subOptionModel.closeUpImage.imageName,
                            imageData: subOptionModel.closeUpImage.imageData,
                            imageURL: subOptionModel.closeUpImage.imageURL,
                            imagelocation: subOptionModel.closeUpImage.imagelocation,
                            imageDescription: subOptionModel.closeUpImage.imageDescription,
                        });
                        const subOption = yield SubOption_1.SubOption.create({
                            optionId: customProductOption.id,
                            title: element.title,
                            price: element.price,
                            viewStockItem: element.viewStockItem,
                            description: element.description,
                            image: image.id,
                            closeUpImage: closeUpImage.id,
                            order: element.order,
                            isDefault: element.isDefault,
                        });
                        if (element.isDefault) {
                            const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                where: { id: customProductOption.id },
                            });
                            if (opNew) {
                                opNew.defaultLoadingOption = subOption.id;
                                yield opNew.save();
                            }
                        }
                        const subOptionHiddenRule = subOptionModel.hideRules;
                        yield subOptionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newOptionImage = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                subOptionId: subOption.id,
                                ruleId: element.id,
                            });
                        }));
                        var k = 0;
                        const subOptionFabric = subOptionModel.fabric;
                        yield subOptionFabric.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const subOptionFabricModel = subOptionModel.fabric[k];
                            const front = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.front.imageName,
                                imageData: subOptionFabricModel.front.imageData,
                                imageURL: subOptionFabricModel.front.imageURL,
                                imagelocation: subOptionFabricModel.front.imagelocation,
                                imageDescription: subOptionFabricModel.front.imageDescription,
                            });
                            const frontFull = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.frontFull.imageName,
                                imageData: subOptionFabricModel.frontFull.imageData,
                                imageURL: subOptionFabricModel.frontFull.imageURL,
                                imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                imageDescription: subOptionFabricModel.frontFull.imageDescription,
                            });
                            const back = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.back.imageName,
                                imageData: subOptionFabricModel.back.imageData,
                                imageURL: subOptionFabricModel.back.imageURL,
                                imagelocation: subOptionFabricModel.back.imagelocation,
                                imageDescription: subOptionFabricModel.back.imageDescription,
                            });
                            const backFull = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.backFull.imageName,
                                imageData: subOptionFabricModel.backFull.imageData,
                                imageURL: subOptionFabricModel.backFull.imageURL,
                                imagelocation: subOptionFabricModel.backFull.imagelocation,
                                imageDescription: subOptionFabricModel.backFull.imageDescription,
                            });
                            const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                subOptionId: subOption.id,
                                customId: element.customId,
                                name: element.name,
                                front: front.id,
                                frontFull: frontFull.id,
                                back: back.id,
                                backFull: backFull.id,
                            });
                            k++;
                        }));
                        j++;
                    }));
                    return customProductOption;
                }
            }
            catch (err) {
                throw new Error("Failed to add Option! | " + err.message);
            }
        });
    }
    updateOption(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionModel = model.option;
                const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                    where: { id: model.id },
                });
                if (!resultOption) {
                    throw new Error("Option Not Found!");
                }
                else {
                    resultOption.name = optionModel.name;
                    resultOption.style = optionModel.style;
                    resultOption.contrast = optionModel.contrast;
                    resultOption.accent = optionModel.accent;
                    resultOption.optionGroup = optionModel.optionGroup;
                    resultOption.hidden = optionModel.hidden;
                    resultOption.front = optionModel.front;
                    resultOption.back = optionModel.back;
                    resultOption.description = optionModel.description;
                    resultOption.frontViewOrder = optionModel.frontViewOrder;
                    resultOption.backViewOrder = optionModel.backViewOrder;
                    yield resultOption.save();
                }
                const oldOptionImage = yield Images_1.Image.findOne({
                    where: { id: resultOption.image },
                });
                if (oldOptionImage) {
                    oldOptionImage.imageName = optionModel.image.imageName;
                    oldOptionImage.imageData = optionModel.image.imageData;
                    oldOptionImage.imageURL = optionModel.image.imageURL;
                    oldOptionImage.imagelocation = optionModel.image.imagelocation;
                    oldOptionImage.imageDescription = optionModel.image.imageDescription;
                    yield oldOptionImage.save();
                }
                yield OptionHidenRule_1.OptionHidenRule.destroy({ where: { optionId: resultOption.id } });
                const optionHiddenRule = optionModel.hideRules;
                yield optionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const newOptionImage = yield OptionHidenRule_1.OptionHidenRule.create({
                        optionId: resultOption.id,
                        ruleId: element.id,
                    });
                }));
                var j = 0;
                const subOpModel = optionModel.subOptions;
                //const subOption = subOpModel as SubOption[];
                const subOption = yield SubOption_1.SubOption.findAll({
                    where: { optionId: resultOption.id },
                });
                yield subOption.forEach((subElement) => __awaiter(this, void 0, void 0, function* () {
                    const resultSubOption = yield SubOption_1.SubOption.findOne({
                        where: { id: subElement.id },
                    });
                    const subOptionModel = subOpModel[j];
                    if (!resultSubOption) {
                        const image = yield Images_1.Image.create({
                            imageName: subOptionModel.image.imageName,
                            imageData: subOptionModel.image.imageData,
                            imageURL: subOptionModel.image.imageURL,
                            imagelocation: subOptionModel.image.imagelocation,
                            imageDescription: subOptionModel.image.imageDescription,
                        });
                        const closeUpImage = yield Images_1.Image.create({
                            imageName: subOptionModel.closeUpImage.imageName,
                            imageData: subOptionModel.closeUpImage.imageData,
                            imageURL: subOptionModel.closeUpImage.imageURL,
                            imagelocation: subOptionModel.closeUpImage.imagelocation,
                            imageDescription: subOptionModel.closeUpImage.imageDescription,
                        });
                        const subOption = yield SubOption_1.SubOption.create({
                            optionId: resultOption.id,
                            title: subOptionModel.title,
                            price: subOptionModel.price,
                            viewStockItem: subOptionModel.viewStockItem,
                            description: subOptionModel.description,
                            image: image.id,
                            closeUpImage: closeUpImage.id,
                            order: subOptionModel.order,
                            isDefault: subOptionModel.isDefault,
                        });
                        if (subOptionModel.isDefault) {
                            const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                where: { id: resultOption.id },
                            });
                            if (opNew) {
                                opNew.defaultLoadingOption = subOption.id;
                                yield opNew.save();
                            }
                        }
                        const subOptionHiddenRule = subOptionModel.hideRules;
                        yield subOptionHiddenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newOptionImage = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                subOptionId: subOption.id,
                                ruleId: element.id,
                            });
                        }));
                        var k = 0;
                        const subOptionFabric = subOptionModel.fabric;
                        yield subOptionFabric.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const subOptionFabricModel = subOptionModel.fabric[k];
                            const front = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.front.imageName,
                                imageData: subOptionFabricModel.front.imageData,
                                imageURL: subOptionFabricModel.front.imageURL,
                                imagelocation: subOptionFabricModel.front.imagelocation,
                                imageDescription: subOptionFabricModel.front.imageDescription,
                            });
                            const frontFull = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.frontFull.imageName,
                                imageData: subOptionFabricModel.frontFull.imageData,
                                imageURL: subOptionFabricModel.frontFull.imageURL,
                                imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                imageDescription: subOptionFabricModel.frontFull.imageDescription,
                            });
                            const back = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.back.imageName,
                                imageData: subOptionFabricModel.back.imageData,
                                imageURL: subOptionFabricModel.back.imageURL,
                                imagelocation: subOptionFabricModel.back.imagelocation,
                                imageDescription: subOptionFabricModel.back.imageDescription,
                            });
                            const backFull = yield Images_1.Image.create({
                                imageName: subOptionFabricModel.backFull.imageName,
                                imageData: subOptionFabricModel.backFull.imageData,
                                imageURL: subOptionFabricModel.backFull.imageURL,
                                imagelocation: subOptionFabricModel.backFull.imagelocation,
                                imageDescription: subOptionFabricModel.backFull.imageDescription,
                            });
                            const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                subOptionId: subOption.id,
                                customId: element.customId,
                                name: element.name,
                                front: front.id,
                                frontFull: frontFull.id,
                                back: back.id,
                                backFull: backFull.id,
                            });
                            k++;
                        }));
                    }
                    else {
                        const image = yield Images_1.Image.findOne({
                            where: { id: resultSubOption.image },
                        });
                        if (image) {
                            image.imageName = subOptionModel.image.imageName;
                            image.imageData = subOptionModel.image.imageData;
                            image.imageURL = subOptionModel.image.imageURL;
                            image.imagelocation = subOptionModel.image.imagelocation;
                            image.imageDescription = subOptionModel.image.imageDescription;
                            yield image.save();
                        }
                        const closeUpImage = yield Images_1.Image.findOne({
                            where: { id: resultSubOption.closeUpImage },
                        });
                        if (closeUpImage) {
                            closeUpImage.imageName = subOptionModel.closeUpImage.imageName;
                            closeUpImage.imageData = subOptionModel.closeUpImage.imageData;
                            closeUpImage.imageURL = subOptionModel.closeUpImage.imageURL;
                            closeUpImage.imagelocation =
                                subOptionModel.closeUpImage.imagelocation;
                            closeUpImage.imageDescription =
                                subOptionModel.closeUpImage.imageDescription;
                            yield closeUpImage.save();
                        }
                        resultSubOption.optionId = resultOption.id;
                        resultSubOption.title = subElement.title;
                        resultSubOption.price = subElement.price;
                        resultSubOption.viewStockItem = subElement.viewStockItem;
                        resultSubOption.description = subElement.description;
                        // resultSubOption.image = subElement.image;
                        // resultSubOption.closeUpImage = subElement.closeUpImage;
                        resultSubOption.order = subElement.order;
                        resultSubOption.isDefault = subElement.isDefault;
                        yield resultSubOption.save();
                        if (subElement.isDefault) {
                            const opNew = yield CustomProductOption_1.CustomProductOption.findOne({
                                where: { id: resultOption.id },
                            });
                            if (opNew) {
                                opNew.defaultLoadingOption = resultSubOption.id;
                                yield opNew.save();
                            }
                        }
                        yield SubOptionHidenRule_1.SubOptionHidenRule.destroy({
                            where: { subOptionId: resultSubOption.id },
                        });
                        const subOptionHidenRule = subOptionModel.hideRules;
                        yield subOptionHidenRule.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newsubOptionHidenRule = yield SubOptionHidenRule_1.SubOptionHidenRule.create({
                                subOptionId: subElement.id,
                                ruleId: element.id,
                            });
                        }));
                        var k = 0;
                        //const subOptionFabric = subOptionModel.fabric as SubOptionFabric[];
                        const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.findAll({
                            where: { subOptionId: resultSubOption.id },
                        });
                        yield subOptionFabric.forEach((fabElement) => __awaiter(this, void 0, void 0, function* () {
                            const subOptionFabricModel = subOptionModel.fabric[k];
                            const resultSubOptionFab = yield SubOptionFabric_1.SubOptionFabric.findOne({
                                where: { id: fabElement.id },
                            });
                            if (!resultSubOptionFab) {
                                const front = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.front.imageName,
                                    imageData: subOptionFabricModel.front.imageData,
                                    imageURL: subOptionFabricModel.front.imageURL,
                                    imagelocation: subOptionFabricModel.front.imagelocation,
                                    imageDescription: subOptionFabricModel.front.imageDescription,
                                });
                                const frontFull = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.frontFull.imageName,
                                    imageData: subOptionFabricModel.frontFull.imageData,
                                    imageURL: subOptionFabricModel.frontFull.imageURL,
                                    imagelocation: subOptionFabricModel.frontFull.imagelocation,
                                    imageDescription: subOptionFabricModel.frontFull.imageDescription,
                                });
                                const back = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.back.imageName,
                                    imageData: subOptionFabricModel.back.imageData,
                                    imageURL: subOptionFabricModel.back.imageURL,
                                    imagelocation: subOptionFabricModel.back.imagelocation,
                                    imageDescription: subOptionFabricModel.back.imageDescription,
                                });
                                const backFull = yield Images_1.Image.create({
                                    imageName: subOptionFabricModel.backFull.imageName,
                                    imageData: subOptionFabricModel.backFull.imageData,
                                    imageURL: subOptionFabricModel.backFull.imageURL,
                                    imagelocation: subOptionFabricModel.backFull.imagelocation,
                                    imageDescription: subOptionFabricModel.backFull.imageDescription,
                                });
                                const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.create({
                                    subOptionId: subOptionModel.id,
                                    customId: subOptionModel.customId,
                                    name: subOptionFabricModel.name,
                                    front: front.id,
                                    frontFull: frontFull.id,
                                    back: back.id,
                                    backFull: backFull.id,
                                });
                            }
                            else {
                                const front = yield Images_1.Image.findOne({
                                    where: { id: resultSubOptionFab.front },
                                });
                                if (front) {
                                    front.imageName = subOptionFabricModel.front.imageName;
                                    front.imageData = subOptionFabricModel.front.imageData;
                                    front.imageURL = subOptionFabricModel.front.imageURL;
                                    front.imagelocation = subOptionFabricModel.front.imagelocation;
                                    front.imageDescription =
                                        subOptionFabricModel.front.imageDescription;
                                    yield front.save();
                                }
                                const frontFull = yield Images_1.Image.findOne({
                                    where: { id: resultSubOptionFab.frontFull },
                                });
                                if (frontFull) {
                                    frontFull.imageName = subOptionFabricModel.frontFull.imageName;
                                    frontFull.imageData = subOptionFabricModel.frontFull.imageData;
                                    frontFull.imageURL = subOptionFabricModel.frontFull.imageURL;
                                    frontFull.imagelocation =
                                        subOptionFabricModel.frontFull.imagelocation;
                                    frontFull.imageDescription =
                                        subOptionFabricModel.frontFull.imageDescription;
                                    yield frontFull.save();
                                }
                                const back = yield Images_1.Image.findOne({
                                    where: { id: resultSubOptionFab.back },
                                });
                                if (back) {
                                    back.imageName = subOptionFabricModel.back.imageName;
                                    back.imageData = subOptionFabricModel.back.imageData;
                                    back.imageURL = subOptionFabricModel.back.imageURL;
                                    back.imagelocation = subOptionFabricModel.back.imagelocation;
                                    back.imageDescription =
                                        subOptionFabricModel.back.imageDescription;
                                    yield back.save();
                                }
                                const backFull = yield Images_1.Image.findOne({
                                    where: { id: resultSubOptionFab.backFull },
                                });
                                if (backFull) {
                                    backFull.imageName = subOptionFabricModel.backFull.imageName;
                                    backFull.imageData = subOptionFabricModel.backFull.imageData;
                                    backFull.imageURL = subOptionFabricModel.backFull.imageURL;
                                    backFull.imagelocation =
                                        subOptionFabricModel.backFull.imagelocation;
                                    backFull.imageDescription =
                                        subOptionFabricModel.backFull.imageDescription;
                                    yield backFull.save();
                                }
                                resultSubOptionFab.subOptionId = subElement.id;
                                resultSubOptionFab.customId = fabElement.customId;
                                resultSubOptionFab.name = fabElement.name;
                                // resultSubOptionFab.front = front ? front.id : 0;
                                // resultSubOptionFab.frontFull = frontFull ? frontFull.id : 0;
                                // resultSubOptionFab.back = back ? back.id : 0;
                                // resultSubOptionFab.backFull = backFull ? backFull.id : 0;
                                yield resultSubOptionFab.save();
                            }
                            k++;
                        }));
                    }
                    j++;
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Option! | " + err.message);
            }
        });
    }
    deleteOption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                    where: { id: id },
                });
                if (!resultOption) {
                    throw new Error("Option Not Found!");
                }
                yield resultOption.destroy();
                yield Images_1.Image.destroy({ where: { id: resultOption.image } });
                yield OptionHidenRule_1.OptionHidenRule.destroy({ where: { optionId: resultOption.id } });
                const subOption = yield SubOption_1.SubOption.findAll({
                    where: { optionId: resultOption.id },
                });
                yield subOption.forEach((subElement) => __awaiter(this, void 0, void 0, function* () {
                    yield SubOption_1.SubOption.destroy({ where: { id: subElement.id } });
                    yield Images_1.Image.destroy({ where: { id: subElement.image } });
                    yield Images_1.Image.destroy({ where: { id: subElement.closeUpImage } });
                    yield SubOptionHidenRule_1.SubOptionHidenRule.destroy({
                        where: { subOptionId: subElement.id },
                    });
                    const subOptionFabric = yield SubOptionFabric_1.SubOptionFabric.findAll({
                        where: { subOptionId: subElement.id },
                    });
                    yield subOptionFabric.forEach((fabElement) => __awaiter(this, void 0, void 0, function* () {
                        yield SubOptionFabric_1.SubOptionFabric.destroy({ where: { id: fabElement.id } });
                        yield Images_1.Image.destroy({ where: { id: fabElement.front } });
                        yield Images_1.Image.destroy({ where: { id: fabElement.frontFull } });
                        yield Images_1.Image.destroy({ where: { id: fabElement.back } });
                        yield Images_1.Image.destroy({ where: { id: fabElement.backFull } });
                    }));
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Option! | " + err.message);
            }
        });
    }
    getOption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCuProOp = [];
                const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                    where: { id: id },
                });
                if (!optionData || optionData.length === 0) {
                    throw new Error("Option data not found!");
                }
                yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                    const optionImage = (yield Images_1.Image.findOne({
                        where: { id: elementCPO.image },
                    }));
                    const tempCuProSubOp = [];
                    const subOptionData = yield SubOption_1.SubOption.findAll({
                        where: { optionId: elementCPO.id },
                    });
                    yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                        const subimage = (yield Images_1.Image.findOne({
                            where: { id: elementCPSO.image },
                        }));
                        const subcloseUpImage = (yield Images_1.Image.findOne({
                            where: { id: elementCPSO.closeUpImage },
                        }));
                        const tempCuProSubOpFab = [];
                        const subOptionFabData = yield SubOptionFabric_1.SubOptionFabric.findAll({
                            where: { subOptionId: elementCPSO.id },
                        });
                        yield Promise.all(subOptionFabData.map((elementCPSOF) => __awaiter(this, void 0, void 0, function* () {
                            const front = (yield Images_1.Image.findOne({
                                where: { id: elementCPSOF.front },
                            }));
                            const frontFull = (yield Images_1.Image.findOne({
                                where: { id: elementCPSOF.frontFull },
                            }));
                            const back = (yield Images_1.Image.findOne({
                                where: { id: elementCPSOF.back },
                            }));
                            const backFull = (yield Images_1.Image.findOne({
                                where: { id: elementCPSOF.backFull },
                            }));
                            const tempFab = {
                                id: elementCPSOF.id,
                                customId: elementCPSOF.customId,
                                name: elementCPSOF.name,
                                front: front,
                                frontFull: frontFull,
                                back: back,
                                backFull: backFull,
                            };
                            tempCuProSubOpFab.push(tempFab);
                        })));
                        const tempCuProSubOpHR = [];
                        const subOptionHideRuleData = yield SubOptionHidenRule_1.SubOptionHidenRule.findAll({
                            where: { subOptionId: elementCPSO.id },
                        });
                        yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                            const temp = {
                                id: elementCPSOFHR.id,
                                subOptionId: elementCPSOFHR.subOptionId,
                                ruleId: elementCPSOFHR.ruleId,
                            };
                            tempCuProSubOpHR.push(temp);
                        })));
                        const temp = {
                            id: elementCPSO.id,
                            title: elementCPSO.title,
                            price: elementCPSO.price,
                            viewStockItem: elementCPSO.viewStockItem,
                            description: elementCPSO.description,
                            image: subimage,
                            closeUpImage: subcloseUpImage,
                            hideRules: tempCuProSubOpHR,
                            fabric: tempCuProSubOpFab,
                        };
                        tempCuProSubOp.push(temp);
                    })));
                    const tempCuProOpHR = [];
                    const subOptionHideRuleData = yield OptionHidenRule_1.OptionHidenRule.findAll({
                        where: { optionId: elementCPO.id },
                    });
                    yield Promise.all(subOptionHideRuleData.map((elementCPSOFHR) => __awaiter(this, void 0, void 0, function* () {
                        const temp = {
                            id: elementCPSOFHR.id,
                            optionId: elementCPSOFHR.optionId,
                            ruleId: elementCPSOFHR.ruleId,
                        };
                        tempCuProOpHR.push(temp);
                    })));
                    const temp = {
                        id: elementCPO.id,
                        name: elementCPO.name,
                        image: optionImage,
                        style: elementCPO.style,
                        accent: elementCPO.accent,
                        optionGroup: elementCPO.optionGroup,
                        hidden: elementCPO.hidden,
                        front: elementCPO.front,
                        back: elementCPO.back,
                        description: elementCPO.description,
                        hideRules: tempCuProOpHR,
                        subOptions: tempCuProSubOp,
                    };
                    tempCuProOp.push(temp);
                })));
                return yield tempCuProOp;
            }
            catch (err) {
                throw new Error("Failed to get Option! | " + err.message);
            }
        });
    }
}
exports.CustomProductRepo = CustomProductRepo;
