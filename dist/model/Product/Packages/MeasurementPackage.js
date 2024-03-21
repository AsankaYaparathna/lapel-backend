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
exports.MeasurementPackage = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CstomProductPackages_1 = require("./CstomProductPackages");
const CustomProductOption_1 = require("../Custom Product/CustomProductOption");
let MeasurementPackage = class MeasurementPackage extends sequelize_typescript_1.Model {
};
exports.MeasurementPackage = MeasurementPackage;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], MeasurementPackage.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CstomProductPackages_1.CstomProductPackages),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "packageId" }),
    __metadata("design:type", Number)
], MeasurementPackage.prototype, "packageId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomProductOption_1.CustomProductOption),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "optionId" }),
    __metadata("design:type", Number)
], MeasurementPackage.prototype, "optionId", void 0);
exports.MeasurementPackage = MeasurementPackage = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT_PACKAGE_MEASUREMENT",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], MeasurementPackage);
