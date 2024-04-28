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
const SubOption_1 = require("../../model/Product/Custom Product/SubOption");
const cloudinary_1 = require("cloudinary");
class CustomProductRepo {
    create(model) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CustomProduct_1.CustomProduct.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create Custom Product! Custom Product with this name already exists!");
                }
                const customProduct = yield CustomProduct_1.CustomProduct.create({
                    name: (_a = model.name) !== null && _a !== void 0 ? _a : "",
                    customId: (_b = model.customId) !== null && _b !== void 0 ? _b : "",
                    description: (_c = model.description) !== null && _c !== void 0 ? _c : "",
                    information: (_d = model.information) !== null && _d !== void 0 ? _d : "",
                });
            }
            catch (err) {
                const result = yield CustomProduct_1.CustomProduct.findOne({ where: { name: model.name } });
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
                    customProduct.name = model.name;
                    customProduct.description = model.description;
                    customProduct.information = model.information;
                    yield customProduct.save();
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
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({
                    where: { id: id },
                    order: [["id", "ASC"]],
                });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield CustomProduct_1.CustomProduct.destroy({ where: { id: id } });
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
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id }, order: [["id", "ASC"]] });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                const prodData = yield new CustomProductRepo().getCustomProduct(customProduct);
                return prodData;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getCustomProductByName(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { name: id }, order: [["id", "ASC"]] });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                const prodData = yield new CustomProductRepo().getCustomProduct(customProduct);
                return prodData;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getByIdWithType(id, typeName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: id }, order: [["id", "ASC"]] });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                var styleV = typeName === "style";
                var accentV = typeName === "accent";
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                        where: { customProductId: elementCP.id, style: styleV, accent: accentV, },
                        order: [["id", "ASC"]]
                    });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const subOptionData = yield SubOption_1.SubOption.findAll({
                            where: { optionId: elementCPO.id }, order: [["id", "ASC"]],
                        });
                        elementCPO.subOptions = subOptionData;
                    })));
                    elementCP.options = optionData;
                })));
                return yield customProduct;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll();
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                const prodData = yield new CustomProductRepo().getCustomProduct(customProduct);
                return prodData;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getCustomProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll();
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                return customProduct;
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
                return yield subOptionData;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    updateCustomProductOptionFrontView(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelData = model;
                yield modelData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                        where: { id: element.id },
                    });
                    if (!resultOption) {
                        throw new Error("Option Not Found!");
                    }
                    resultOption.frontViewOrder = element.frontViewOrder;
                    yield resultOption.save();
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Option front view order! | " + err.message);
            }
        });
    }
    updateCustomProductOptionFrontViewByName(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodName = model.name;
                const resultProduct = yield CustomProduct_1.CustomProduct.findOne({
                    where: { name: prodName },
                });
                if (!resultProduct) {
                    throw new Error("Custom Product Not Found!");
                }
                const modelData = model;
                yield modelData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({
                        where: { id: element.id },
                    });
                    if (!resultOption) {
                        throw new Error("Option Not Found!");
                    }
                    resultOption.frontViewOrder = element.frontViewOrder;
                    yield resultOption.save();
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Option front view order! | " + err.message);
            }
        });
    }
    updateCustomProductOptionBackView(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelData = model;
                yield modelData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({ where: { id: element.id } });
                    if (!resultOption) {
                        throw new Error("Option Not Found!");
                    }
                    resultOption.backViewOrder = element.backViewOrder;
                    yield resultOption.save();
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Option back view order! | " + err.message);
            }
        });
    }
    updateCustomProductOptionBackViewByName(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodName = model.name;
                const resultProduct = yield CustomProduct_1.CustomProduct.findOne({ where: { name: prodName } });
                if (!resultProduct) {
                    throw new Error("Custom Product Not Found!");
                }
                const modelData = model;
                yield modelData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({ where: { id: element.id } });
                    if (!resultOption) {
                        throw new Error("Option Not Found!");
                    }
                    resultOption.backViewOrder = element.backViewOrder;
                    yield resultOption.save();
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Option back view order! | " + err.message);
            }
        });
    }
    deleteOption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({ where: { id: id } });
                if (!resultOption) {
                    throw new Error("Option Not Found!");
                }
                yield resultOption.destroy();
                yield SubOption_1.SubOption.destroy({ where: { optionId: resultOption.id } });
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
                const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { id: id }, order: [["id", "ASC"]] });
                if (!optionData || optionData.length === 0) {
                    throw new Error("Option data not found!");
                }
                const tempOption = [];
                yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                    const tempSubOption = [];
                    const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: elementCPO.id }, order: [["id", "ASC"]] });
                    yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                        const data = {
                            id: elementCPSO.id,
                            optionId: elementCPSO.optionId,
                            title: elementCPSO.title,
                            price: elementCPSO.price,
                            viewStockItem: elementCPSO.viewStockItem,
                            description: elementCPSO.description,
                            image: elementCPSO.image,
                            closeUpImage: elementCPSO.closeUpImage,
                            hideRules: elementCPSO.hideRules,
                            fabric: elementCPSO.fabric,
                            order: elementCPSO.order,
                            isDefault: elementCPSO.isDefault,
                        };
                        tempSubOption.push(data);
                    })));
                    let opData = {
                        id: elementCPO.id,
                        customProductId: elementCPO.customProductId,
                        name: elementCPO.name,
                        image: elementCPO.image,
                        style: elementCPO.style,
                        accent: elementCPO.accent,
                        contrast: elementCPO.contrast,
                        optionGroup: elementCPO.optionGroup,
                        hidden: elementCPO.hidden,
                        front: elementCPO.front,
                        back: elementCPO.back,
                        description: elementCPO.description,
                        frontViewOrder: elementCPO.frontViewOrder,
                        backViewOrder: elementCPO.backViewOrder,
                        hideRules: elementCPO.hideRules,
                        defaultLoadingOption: elementCPO.defaultLoadingOption,
                        subOptions: tempSubOption,
                    };
                    tempOption.push(opData);
                })));
                return yield tempOption;
            }
            catch (err) {
                throw new Error("Failed to get Option! | " + err.message);
            }
        });
    }
    getCustomProductOptionByProdId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { customProductId: id }, order: [["id", "ASC"]] });
                if (!optionData || optionData.length === 0) {
                    throw new Error("Option data not found!");
                }
                return yield optionData;
            }
            catch (err) {
                throw new Error("Failed to get Option! | " + err.message);
            }
        });
    }
    getCustomProductOptionByProdIds(prodId, optionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { id: prodId }, order: [["id", "ASC"]] });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { id: optionId }, order: [["id", "ASC"]] });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: elementCPO.id }, order: [["id", "ASC"]] });
                        elementCPO.subOptions = subOptionData;
                    })));
                    elementCP.options = optionData;
                })));
                return yield customProduct;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getCustomProductOptionByProdName(prodId, optionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findAll({ where: { name: prodId }, order: [["id", "ASC"]], });
                if (!customProduct || customProduct.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { id: optionId }, order: [["id", "ASC"]], });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const optionImage = (yield Images_1.Image.findOne({ where: { id: elementCPO.image } }));
                        const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: elementCPO.id }, order: [["id", "ASC"]] });
                        elementCPO.subOptions = subOptionData;
                    })));
                    elementCP.options = optionData;
                })));
                return yield customProduct;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
    getCustomProductHideRules(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionData = yield CustomProductOption_1.CustomProductOption.findAll({
                    where: { customProductId: id },
                    attributes: ["id", "name"],
                    order: [["id", "ASC"]],
                });
                if (!optionData) {
                    throw new Error("Option data not found!");
                }
                let tempOpData = [];
                yield Promise.all(optionData.map((optionData) => __awaiter(this, void 0, void 0, function* () {
                    const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: optionData.id }, attributes: ["id", "title"], order: [["id", "ASC"]] });
                    if (!subOptionData) {
                        throw new Error("Sub Option data not found!");
                    }
                    let tempSubOp = [];
                    yield Promise.all(subOptionData.map((suboptionData) => __awaiter(this, void 0, void 0, function* () {
                        const temp = {
                            suboptionId: suboptionData.id,
                            optionId: optionData.id,
                            name: suboptionData.title,
                        };
                        tempSubOp.push(temp);
                    })));
                    const tempOp = {
                        id: optionData.id,
                        name: optionData.name,
                        subOption: tempSubOp,
                    };
                    tempOpData.push(tempOp);
                })));
                return yield tempOpData;
            }
            catch (err) {
                throw new Error("Failed to get Option! | " + err.message);
            }
        });
    }
    getCustomProductSubOptionHideRules(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: id }, attributes: ["id", "title"], order: [["id", "ASC"]] });
                if (!subOptionData) {
                    throw new Error("Sub Option data not found!");
                }
                return yield subOptionData;
            }
            catch (err) {
                throw new Error("Failed to get Option! | " + err.message);
            }
        });
    }
    getFrontAndBackOrder(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultOption = yield CustomProductOption_1.CustomProductOption.findAll({
                where: { customProductId: id },
            });
            let maxOrder = 0;
            if (resultOption && resultOption.length > 0) {
                if (type === "frontViewOrder") {
                    maxOrder = Math.max(...resultOption.map((option) => option.frontViewOrder));
                }
                else if (type === "backViewOrder") {
                    maxOrder = Math.max(...resultOption.map((option) => option.backViewOrder));
                }
                else {
                    throw new Error("Invalid type");
                }
            }
            return maxOrder + 1;
        });
    }
    getSuboptionOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultOption = yield SubOption_1.SubOption.findAll({ where: { optionId: id } });
            let maxOrder = 0;
            if (resultOption && resultOption.length > 0) {
                maxOrder = Math.max(...resultOption.map((option) => option.order));
            }
            return maxOrder + 1;
        });
    }
    //v2
    createCustomProductByName(model, productName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findOne({ where: { name: productName } });
                if (!customProduct) {
                    throw new Error("Data Not Found!");
                }
                const optionModel = model;
                const existingOption = yield CustomProductOption_1.CustomProductOption.findOne({ where: { name: optionModel.name } });
                if (existingOption) {
                    throw new Error("This option already exists!");
                }
                optionModel.frontViewOrder = yield new CustomProductRepo().getFrontAndBackOrder("frontViewOrder", customProduct.id);
                optionModel.backViewOrder = yield new CustomProductRepo().getFrontAndBackOrder("backViewOrder", customProduct.id);
                const image = optionModel.image !== null ? yield cloudinary_1.v2.uploader.upload(optionModel.image.imageData.path) : null;
                const customProductOption = yield CustomProductOption_1.CustomProductOption.create({
                    customProductId: customProduct.id,
                    name: optionModel.name,
                    image: image !== null ? image.url : "",
                    style: optionModel.style,
                    accent: optionModel.accent,
                    contrast: optionModel.contrast,
                    optionGroup: optionModel.optionGroup,
                    hidden: optionModel.hidden,
                    front: optionModel.front,
                    back: optionModel.back,
                    description: optionModel.description,
                    frontViewOrder: optionModel.frontViewOrder,
                    backViewOrder: optionModel.backViewOrder,
                    hideRules: optionModel.hideRules,
                    defaultLoadingOption: optionModel.defaultLoadingOption,
                });
                for (const element of optionModel.subOptions) {
                    element.order = yield new CustomProductRepo().getSuboptionOrder(customProductOption.id);
                    const image = element.image !== null ? yield cloudinary_1.v2.uploader.upload(element.image.imageData.path) : null;
                    const closeUpImage = element.closeUpImage !== null ? yield cloudinary_1.v2.uploader.upload(element.closeUpImage.imageData.path) : null;
                    const subOption = yield SubOption_1.SubOption.create({
                        optionId: customProductOption.id,
                        title: element.title,
                        price: element.price,
                        viewStockItem: element.viewStockItem,
                        description: element.description,
                        image: image != null ? image.url : "",
                        closeUpImage: closeUpImage != null ? closeUpImage.url : "",
                        hideRules: element.hideRules,
                        fabric: element.fabric,
                        order: element.order,
                        isDefault: element.isDefault || false,
                    });
                    for (const fabric of element.fabric) {
                        fabric.front = fabric.front !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.front.imageData.path)).url : null;
                        fabric.frontFull = fabric.frontFull !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.frontFull.imageData.path)).url : null;
                        fabric.back = fabric.back !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.back.imageData.path)).url : null;
                        fabric.back = fabric.backFull !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.backFull.imageData.path)).url : null;
                    }
                }
                return customProductOption;
            }
            catch (err) {
                throw new Error("Failed to add Option! | " + err.message);
            }
        });
    }
    updateCustomProductByName(model, productName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customProduct = yield CustomProduct_1.CustomProduct.findOne({ where: { name: productName }, });
                if (!customProduct) {
                    throw new Error("Data Not Found!");
                }
                else {
                    const optionModel = model;
                    const resultOption = yield CustomProductOption_1.CustomProductOption.findOne({ where: { id: optionModel.id }, });
                    if (!resultOption) {
                        throw new Error("Option is not exists!");
                    }
                    const image = optionModel.image !== null ? yield cloudinary_1.v2.uploader.upload(optionModel.image.imageData.path) : null;
                    resultOption.name = optionModel.name;
                    resultOption.image = image !== null ? image.url : "";
                    resultOption.style = optionModel.style;
                    resultOption.accent = optionModel.accent;
                    resultOption.contrast = optionModel.contrast;
                    resultOption.optionGroup = optionModel.optionGroup;
                    resultOption.hidden = optionModel.hidden;
                    resultOption.front = optionModel.front;
                    resultOption.back = optionModel.back;
                    resultOption.description = optionModel.description;
                    resultOption.frontViewOrder = optionModel.frontViewOrder;
                    resultOption.backViewOrder = optionModel.backViewOrder;
                    resultOption.hideRules = optionModel.hideRules;
                    resultOption.defaultLoadingOption = optionModel.defaultLoadingOption;
                    yield resultOption.save();
                    yield SubOption_1.SubOption.destroy({ where: { optionId: resultOption.id } });
                    for (const element of optionModel.subOptions) {
                        element.order = yield new CustomProductRepo().getSuboptionOrder(resultOption.id);
                        const image = element.image !== null ? yield cloudinary_1.v2.uploader.upload(element.image.imageData.path) : null;
                        const closeUpImage = element.closeUpImage !== null ? yield cloudinary_1.v2.uploader.upload(element.closeUpImage.imageData.path) : null;
                        const subOption = yield SubOption_1.SubOption.create({
                            optionId: resultOption.id,
                            title: element.title,
                            price: element.price,
                            viewStockItem: element.viewStockItem,
                            description: element.description,
                            image: image != null ? image.url : "",
                            closeUpImage: closeUpImage != null ? closeUpImage.url : "",
                            hideRules: element.hideRules,
                            fabric: element.fabric,
                            order: element.order,
                            isDefault: element.isDefault || false,
                        });
                        for (const fabric of element.fabric) {
                            fabric.front = fabric.front !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.front.imageData.path)).url : null;
                            fabric.frontFull = fabric.frontFull !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.frontFull.imageData.path)).url : null;
                            fabric.back = fabric.back !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.back.imageData.path)).url : null;
                            fabric.back = fabric.backFull !== null ? yield (yield cloudinary_1.v2.uploader.upload(fabric.backFull.imageData.path)).url : null;
                        }
                    }
                    return model;
                }
            }
            catch (err) {
                throw new Error("Failed to update Option! | " + err.message);
            }
        });
    }
    getCustomProduct(customProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempProd = [];
                yield Promise.all(customProduct.map((elementCP) => __awaiter(this, void 0, void 0, function* () {
                    const tempOption = [];
                    const optionData = yield CustomProductOption_1.CustomProductOption.findAll({ where: { customProductId: elementCP.id }, order: [["id", "ASC"]] });
                    yield Promise.all(optionData.map((elementCPO) => __awaiter(this, void 0, void 0, function* () {
                        const tempSubOption = [];
                        const subOptionData = yield SubOption_1.SubOption.findAll({ where: { optionId: elementCPO.id }, order: [["id", "ASC"]] });
                        yield Promise.all(subOptionData.map((elementCPSO) => __awaiter(this, void 0, void 0, function* () {
                            const data = {
                                id: elementCPSO.id,
                                optionId: elementCPSO.optionId,
                                title: elementCPSO.title,
                                price: elementCPSO.price,
                                viewStockItem: elementCPSO.viewStockItem,
                                description: elementCPSO.description,
                                image: elementCPSO.image,
                                closeUpImage: elementCPSO.closeUpImage,
                                hideRules: elementCPSO.hideRules,
                                fabric: elementCPSO.fabric,
                                order: elementCPSO.order,
                                isDefault: elementCPSO.isDefault,
                            };
                            tempSubOption.push(data);
                        })));
                        let opData = {
                            id: elementCPO.id,
                            customProductId: elementCPO.customProductId,
                            name: elementCPO.name,
                            image: elementCPO.image,
                            style: elementCPO.style,
                            accent: elementCPO.accent,
                            contrast: elementCPO.contrast,
                            optionGroup: elementCPO.optionGroup,
                            hidden: elementCPO.hidden,
                            front: elementCPO.front,
                            back: elementCPO.back,
                            description: elementCPO.description,
                            frontViewOrder: elementCPO.frontViewOrder,
                            backViewOrder: elementCPO.backViewOrder,
                            hideRules: elementCPO.hideRules,
                            defaultLoadingOption: elementCPO.defaultLoadingOption,
                            subOptions: tempSubOption,
                        };
                        tempOption.push(opData);
                    })));
                    let ProdData = {
                        id: elementCP.id,
                        name: elementCP.name,
                        customId: elementCP.customId,
                        description: elementCP.description,
                        information: elementCP.information,
                        options: tempOption,
                    };
                    tempProd.push(ProdData);
                })));
                return tempProd;
            }
            catch (err) {
                throw new Error("Failed to get Custom Product! | " + err.message);
            }
        });
    }
}
exports.CustomProductRepo = CustomProductRepo;
