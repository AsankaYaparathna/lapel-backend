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
exports.MainStock = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CustomId_1 = require("../../Common/CustomId");
let MainStock = class MainStock extends sequelize_typescript_1.Model {
};
exports.MainStock = MainStock;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true,
        autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], MainStock.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomId_1.CustomId),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], MainStock.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL, field: "mainStock" }),
    __metadata("design:type", Number)
], MainStock.prototype, "mainStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL, field: "liveStock" }),
    __metadata("design:type", Number)
], MainStock.prototype, "liveStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL, field: "pendingStock" }),
    __metadata("design:type", Number)
], MainStock.prototype, "pendingStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL, field: "usedStock" }),
    __metadata("design:type", Number)
], MainStock.prototype, "usedStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL, field: "totalStock" }),
    __metadata("design:type", Number)
], MainStock.prototype, "totalStock", void 0);
exports.MainStock = MainStock = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_MATERIAL_MAIN_STOCK",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], MainStock);
