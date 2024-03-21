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
exports.Fabric = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Images_1 = require("../../Common/Images");
const Color_1 = require("../../Common/Color");
const Pattern_1 = require("../../Common/Pattern");
const Material_1 = require("../../Common/Material");
const Characteristic_1 = require("../../Common/Characteristic");
const Series_1 = require("../../Common/Series");
const Opacity_1 = require("../../Common/Opacity");
const Weight_1 = require("../../Common/Weight");
const UnitType_1 = require("../../Common/UnitType");
const CustomId_1 = require("../../Common/CustomId");
const Supplier_1 = require("../Supplier/Supplier");
let Fabric = class Fabric extends sequelize_typescript_1.Model {
};
exports.Fabric = Fabric;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], Fabric.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], Fabric.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Fabric.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], Fabric.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "information" }),
    __metadata("design:type", String)
], Fabric.prototype, "information", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "listingPriority" }),
    __metadata("design:type", Number)
], Fabric.prototype, "listingPriority", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Color_1.Color),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "colorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pattern_1.Pattern),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "patterrnId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Material_1.Material),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "materialId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Characteristic_1.Characteristics),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "characteristicsId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Series_1.Series),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "seriesId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Opacity_1.Opacity),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "opacity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Weight_1.Weight),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "weightId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UnitType_1.UnitType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Fabric.prototype, "unitTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "icon" }),
    __metadata("design:type", Number)
], Fabric.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "qr" }),
    __metadata("design:type", Number)
], Fabric.prototype, "qr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "levelOfSafty" }),
    __metadata("design:type", Object)
], Fabric.prototype, "levelOfSafty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stockAlert" }),
    __metadata("design:type", Object)
], Fabric.prototype, "stockAlert", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "featured" }),
    __metadata("design:type", Boolean)
], Fabric.prototype, "featured", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "live" }),
    __metadata("design:type", Boolean)
], Fabric.prototype, "live", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stockMinus" }),
    __metadata("design:type", Object)
], Fabric.prototype, "stockMinus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Supplier_1.Supplier),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "supplierId" }),
    __metadata("design:type", Number)
], Fabric.prototype, "supplierId", void 0);
exports.Fabric = Fabric = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_FABRIC",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Fabric);
