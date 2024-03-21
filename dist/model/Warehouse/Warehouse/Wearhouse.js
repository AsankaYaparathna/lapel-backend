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
exports.Wearhouse = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const WearhouseImages_1 = require("./WearhouseImages");
let Wearhouse = class Wearhouse extends sequelize_typescript_1.Model {
};
exports.Wearhouse = Wearhouse;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], Wearhouse.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], Wearhouse.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "address" }),
    __metadata("design:type", Object)
], Wearhouse.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), field: "contactNo" }),
    __metadata("design:type", String)
], Wearhouse.prototype, "contactNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), field: "contactNo2" }),
    __metadata("design:type", String)
], Wearhouse.prototype, "contactNo2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], Wearhouse.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => WearhouseImages_1.WarehouseImage, { foreignKey: "imageList" }),
    __metadata("design:type", Array)
], Wearhouse.prototype, "imageList", void 0);
exports.Wearhouse = Wearhouse = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_WAREHOUSE",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Wearhouse);
