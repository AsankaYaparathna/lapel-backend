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
exports.SubOptionFabric = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const SubOption_1 = require("./SubOption");
const CustomId_1 = require("../../Common/CustomId");
const Images_1 = require("../../Common/Images");
let SubOptionFabric = class SubOptionFabric extends sequelize_typescript_1.Model {
};
exports.SubOptionFabric = SubOptionFabric;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => SubOption_1.SubOption),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "subOptionId" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "subOptionId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "customId" }),
    __metadata("design:type", String)
], SubOptionFabric.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], SubOptionFabric.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "front" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "front", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "frontFull" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "frontFull", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "back" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "back", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "backFull" }),
    __metadata("design:type", Number)
], SubOptionFabric.prototype, "backFull", void 0);
exports.SubOptionFabric = SubOptionFabric = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT_SUB_OPTION_FABRIC",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], SubOptionFabric);
