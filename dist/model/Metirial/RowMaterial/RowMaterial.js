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
exports.RowMaterial = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Images_1 = require("../../Common/Images");
const Category_1 = require("../../Common/Category/Category");
const SubCategory_1 = require("../../Common/Category/SubCategory");
const UnitType_1 = require("../../Common/UnitType");
const Supplier_1 = require("../Supplier/Supplier");
const CustomId_1 = require("../../Common/CustomId");
let RowMaterial = class RowMaterial extends sequelize_typescript_1.Model {
};
exports.RowMaterial = RowMaterial;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], RowMaterial.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "customId" }),
    __metadata("design:type", String)
], RowMaterial.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], RowMaterial.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "information" }),
    __metadata("design:type", String)
], RowMaterial.prototype, "information", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Supplier_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "supplierId" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "categoryId" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SubCategory_1.SubCategory),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "subCategoryId" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "subCategoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UnitType_1.UnitType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "unitTypeId" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "unitTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "qr" }),
    __metadata("design:type", Number)
], RowMaterial.prototype, "qr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "levelOfSafty" }),
    __metadata("design:type", Object)
], RowMaterial.prototype, "levelOfSafty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "discount" }),
    __metadata("design:type", Object)
], RowMaterial.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stockAlert" }),
    __metadata("design:type", Object)
], RowMaterial.prototype, "stockAlert", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "featured" }),
    __metadata("design:type", Boolean)
], RowMaterial.prototype, "featured", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "live" }),
    __metadata("design:type", Boolean)
], RowMaterial.prototype, "live", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stockMinus" }),
    __metadata("design:type", Object)
], RowMaterial.prototype, "stockMinus", void 0);
exports.RowMaterial = RowMaterial = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_ROW_MATERIAL",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], RowMaterial);
