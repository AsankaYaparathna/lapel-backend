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
exports.WaistcoatBodyMeasurement = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../../User");
let WaistcoatBodyMeasurement = class WaistcoatBodyMeasurement extends sequelize_typescript_1.Model {
};
exports.WaistcoatBodyMeasurement = WaistcoatBodyMeasurement;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, field: "customerId" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "nickName" }),
    __metadata("design:type", String)
], WaistcoatBodyMeasurement.prototype, "nickName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "unit" }),
    __metadata("design:type", Object)
], WaistcoatBodyMeasurement.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "height" }),
    __metadata("design:type", Object)
], WaistcoatBodyMeasurement.prototype, "height", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "weight" }),
    __metadata("design:type", Object)
], WaistcoatBodyMeasurement.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "age" }),
    __metadata("design:type", Object)
], WaistcoatBodyMeasurement.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "bodyFit" }),
    __metadata("design:type", Object)
], WaistcoatBodyMeasurement.prototype, "bodyFit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "neckValue" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "neckValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "chestValue" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "chestValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "stomachValue" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "stomachValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "shouldersValue" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "shouldersValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "waistCoatLengthValue" }),
    __metadata("design:type", Number)
], WaistcoatBodyMeasurement.prototype, "waistCoatLengthValue", void 0);
exports.WaistcoatBodyMeasurement = WaistcoatBodyMeasurement = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_USER_MEASUREMENT_WAISTCOAT_BODY",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], WaistcoatBodyMeasurement);
