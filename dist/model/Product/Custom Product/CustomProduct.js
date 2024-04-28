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
const CustomProductOption_1 = require("./CustomProductOption");
const CustomId_1 = require("../../Common/CustomId");
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
    (0, sequelize_typescript_1.HasMany)(() => CustomProductOption_1.CustomProductOption, { foreignKey: "options" }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "options", void 0);
exports.CustomProduct = CustomProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CustomProduct);
