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
exports.CommonRepo = void 0;
const Category_1 = require("../../model/Common/Category/Category");
const CategoryType_1 = require("../../model/Common/Category/CategoryType");
const SubCategory_1 = require("../../model/Common/Category/SubCategory");
const Characteristic_1 = require("../../model/Common/Characteristic");
const Color_1 = require("../../model/Common/Color");
const Images_1 = require("../../model/Common/Images");
const Material_1 = require("../../model/Common/Material");
const Opacity_1 = require("../../model/Common/Opacity");
const Pattern_1 = require("../../model/Common/Pattern");
const Series_1 = require("../../model/Common/Series");
const UnitType_1 = require("../../model/Common/UnitType");
const Weight_1 = require("../../model/Common/Weight");
const Supplier_1 = require("../../model/Metirial/Supplier/Supplier");
class CommonRepo {
    //Color
    createColor(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Color_1.Color.create({
                    colorCode: model.colorCode
                });
            }
            catch (err) {
                const result = yield Color_1.Color.findOne({ where: { colorCode: model.colorCode } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getColor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Color_1.Color.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Pattern
    createPattern(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Pattern_1.Pattern.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Pattern_1.Pattern.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getPattern() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Pattern_1.Pattern.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Material
    createMaterial(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Material_1.Material.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Material_1.Material.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getMaterial() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Material_1.Material.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Characteristics
    createCharacteristics(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Characteristic_1.Characteristics.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Characteristic_1.Characteristics.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getCharacteristics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Characteristic_1.Characteristics.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Image
    createImage(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Images_1.Image.create({
                    imageName: model.imageName,
                    imageData: model.imageData,
                    imageDescription: model.imageDescription,
                });
            }
            catch (err) {
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Images_1.Image.findOne({ where: { id: id } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    updateImage(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Images_1.Image.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                result.imageName = model.imageName;
                result.imageData = model.imageData;
                result.imageDescription = model.imageDescription;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Image! | " + err.message);
            }
        });
    }
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Images_1.Image.findOne({ where: { id: id } });
                if (!result) {
                    return null;
                }
                yield result.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Image! | " + err.message);
            }
        });
    }
    //Opacity
    createOpacity(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Opacity_1.Opacity.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Opacity_1.Opacity.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getOpacity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Opacity_1.Opacity.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Series
    createSeries(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Series_1.Series.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Series_1.Series.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Series_1.Series.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Unit Type
    createUnitType(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UnitType_1.UnitType.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield UnitType_1.UnitType.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getUnitType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UnitType_1.UnitType.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Weight
    createWeight(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Weight_1.Weight.create({
                    name: model.name
                });
            }
            catch (err) {
                const result = yield Weight_1.Weight.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getWeight() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Weight_1.Weight.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Supplier
    createSupplier(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Supplier_1.Supplier.create({
                    name: model.name,
                    description: model.description,
                    contactNo: model.contactNo
                });
            }
            catch (err) {
                const result = yield Supplier_1.Supplier.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create! this is already exists!");
                }
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getSupplier() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Supplier_1.Supplier.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Load data! | " + err.message);
            }
        });
    }
    //Category Type
    createCategoryType(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CategoryType_1.CategoryType.create({
                    typeName: model.typeName
                });
            }
            catch (err) {
                throw new Error("Failed to create Category Type! | " + err.message);
            }
        });
    }
    getCategoryType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CategoryType_1.CategoryType.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Category Type data! | " + err.message);
            }
        });
    }
    getCategoryTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CategoryType_1.CategoryType.findOne({ where: { id: id } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Category Type data! | " + err.message);
            }
        });
    }
    updateCategoryType(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CategoryType_1.CategoryType.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                result.typeName = model.typeName;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Category Type! | " + err.message);
            }
        });
    }
    deleteCategoryType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield CategoryType_1.CategoryType.findOne({ where: { id: id } });
                if (!result) {
                    return null;
                }
                yield result.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Category Type! | " + err.message);
            }
        });
    }
    //Category
    createCategory(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Category_1.Category.create({
                    categoryType: model.categoryType,
                    categoryName: model.categoryName,
                    categoryDescription: model.categoryDescription,
                });
            }
            catch (err) {
                throw new Error("Failed to create! | " + err.message);
            }
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Category_1.Category.findOne({ where: { id: id } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Category Type data! | " + err.message);
            }
        });
    }
    getByCategoryTypeId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Category_1.Category.findAll({ where: { categoryType: id } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Category Type data! | " + err.message);
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Category_1.Category.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Category data! | " + err.message);
            }
        });
    }
    updateCategory(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Category_1.Category.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                result.categoryType = model.categoryType;
                result.categoryName = model.categoryName;
                result.categoryDescription = model.categoryDescription;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Category! | " + err.message);
            }
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Category_1.Category.findOne({ where: { id: id } });
                if (!result) {
                    return null;
                }
                yield result.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Category! | " + err.message);
            }
        });
    }
    //Sub Category
    createSubCategory(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SubCategory_1.SubCategory.create({
                    subcategoryName: model.subcategoryName,
                    subcategoryDescription: model.subcategoryDescription,
                    categoryId: model.categoryId,
                });
            }
            catch (err) {
                throw new Error("Failed to create Sub Category! | " + err.message);
            }
        });
    }
    getSubCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SubCategory_1.SubCategory.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Sub Category data! | " + err.message);
            }
        });
    }
    getSubCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SubCategory_1.SubCategory.findOne({ where: { id: id } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get Sub Category! | " + err.message);
            }
        });
    }
    updateSubCategory(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SubCategory_1.SubCategory.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                result.subcategoryName = model.subcategoryName;
                result.subcategoryDescription = model.subcategoryDescription;
                result.categoryId = model.categoryId;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Sub Category! | " + err.message);
            }
        });
    }
    deleteSubCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SubCategory_1.SubCategory.findOne({ where: { id: id } });
                if (!result) {
                    return null;
                }
                yield result.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Sub Category! | " + err.message);
            }
        });
    }
}
exports.CommonRepo = CommonRepo;
