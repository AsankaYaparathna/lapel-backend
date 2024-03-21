"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomProduct = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Category_1 = require("../../Common/Category/Category");
const CategoryType_1 = require("../../Common/Category/CategoryType");
const CustomProductOption_1 = require("./CustomProductOption");
const CustomId_1 = require("../../Common/CustomId");
const Characteristic_1 = require("../../Common/Characteristic");
const Color_1 = require("../../Common/Color");
const Material_1 = require("../../Common/Material");
const Pattern_1 = require("../../Common/Pattern");
const SubCategory_1 = require("../../Common/Category/SubCategory");
const Opacity_1 = require("../../Common/Opacity");
const Weight_1 = require("../../Common/Weight");
let CustomProduct = class CustomProduct extends sequelize_typescript_1.Model {
};
exports.CustomProduct = CustomProduct;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], CustomProduct.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "information" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "information", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "relatedProdId" }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "relatedProdId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "live" }),
    __metadata("design:type", Boolean)
], CustomProduct.prototype, "live", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "featured" }),
    __metadata("design:type", Boolean)
], CustomProduct.prototype, "featured", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "categoryId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SubCategory_1.SubCategory),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "subCategoryId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "subCategoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "categoryName" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CategoryType_1.CategoryType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "categoryTypeId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pattern_1.Pattern),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "patterrnId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Color_1.Color),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "colorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Characteristic_1.Characteristics),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "characteristicsId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Material_1.Material),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "materialId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "packageId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "packageId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Opacity_1.Opacity),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "opacity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Weight_1.Weight),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "weightId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "icon" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "qr" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "qr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "images" }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isActive" }),
    __metadata("design:type", Boolean)
], CustomProduct.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CustomProductOption_1.CustomProductOption, { foreignKey: "customProductOption" }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "customProductOption", void 0);
exports.CustomProduct = CustomProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CustomProduct);
