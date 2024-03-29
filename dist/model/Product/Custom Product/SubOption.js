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
exports.SubOption = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CustomProductOption_1 = require("./CustomProductOption");
const Images_1 = require("../../Common/Images");
const SubOptionHidenRule_1 = require("./SubOptionHidenRule");
const SubOptionFabric_1 = require("./SubOptionFabric");
let SubOption = class SubOption extends sequelize_typescript_1.Model {
};
exports.SubOption = SubOption;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], SubOption.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomProductOption_1.CustomProductOption),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "optionId" }),
    __metadata("design:type", Number)
], SubOption.prototype, "optionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "title" }),
    __metadata("design:type", String)
], SubOption.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), field: "price" }),
    __metadata("design:type", Number)
], SubOption.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "viewStockItem" }),
    __metadata("design:type", Boolean)
], SubOption.prototype, "viewStockItem", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], SubOption.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "image" }),
    __metadata("design:type", Number)
], SubOption.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "closeUpImage" }),
    __metadata("design:type", Number)
], SubOption.prototype, "closeUpImage", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SubOptionHidenRule_1.SubOptionHidenRule, { foreignKey: "hideRules" }),
    __metadata("design:type", Array)
], SubOption.prototype, "hideRules", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SubOptionFabric_1.SubOptionFabric, { foreignKey: "fabric" }),
    __metadata("design:type", Array)
], SubOption.prototype, "fabric", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "image1" }),
    __metadata("design:type", Number)
], SubOption.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isDefault" }),
    __metadata("design:type", Boolean)
], SubOption.prototype, "isDefault", void 0);
exports.SubOption = SubOption = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT_SUB_OPTION",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], SubOption);
