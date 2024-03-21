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
exports.MaterialStock = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Wearhouse_1 = require("../../Warehouse/Warehouse/Wearhouse");
const Showroom_1 = require("../../Warehouse/Showroom/Showroom");
const CustomId_1 = require("../../Common/CustomId");
let MaterialStock = class MaterialStock extends sequelize_typescript_1.Model {
};
exports.MaterialStock = MaterialStock;
MaterialStock.ID = "id";
MaterialStock.VALUE = "value";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: MaterialStock.ID }),
    __metadata("design:type", Number)
], MaterialStock.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], MaterialStock.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Wearhouse_1.Wearhouse),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], MaterialStock.prototype, "wearhouseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Showroom_1.Showroom),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Object)
], MaterialStock.prototype, "showroomId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: MaterialStock.VALUE }),
    __metadata("design:type", Number)
], MaterialStock.prototype, "value", void 0);
exports.MaterialStock = MaterialStock = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_MATERIAL_STOCK",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], MaterialStock);
