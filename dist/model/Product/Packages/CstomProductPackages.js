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
exports.CstomProductPackages = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Images_1 = require("../../Common/Images");
let CstomProductPackages = class CstomProductPackages extends sequelize_typescript_1.Model {
};
exports.CstomProductPackages = CstomProductPackages;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CstomProductPackages.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "title" }),
    __metadata("design:type", String)
], CstomProductPackages.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], CstomProductPackages.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "productionTime" }),
    __metadata("design:type", String)
], CstomProductPackages.prototype, "productionTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), field: "price" }),
    __metadata("design:type", Number)
], CstomProductPackages.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "listingPriority" }),
    __metadata("design:type", Number)
], CstomProductPackages.prototype, "listingPriority", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isLive" }),
    __metadata("design:type", Boolean)
], CstomProductPackages.prototype, "isLive", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "icon" }),
    __metadata("design:type", Number)
], CstomProductPackages.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isActive" }),
    __metadata("design:type", Boolean)
], CstomProductPackages.prototype, "isActive", void 0);
exports.CstomProductPackages = CstomProductPackages = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT_PACKAGES",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CstomProductPackages);
