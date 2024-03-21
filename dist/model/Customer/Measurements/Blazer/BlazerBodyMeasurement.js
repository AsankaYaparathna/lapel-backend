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
exports.BlazerBodyMeasurement = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../../User");
let BlazerBodyMeasurement = class BlazerBodyMeasurement extends sequelize_typescript_1.Model {
};
exports.BlazerBodyMeasurement = BlazerBodyMeasurement;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, field: "customerId" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "nickName" }),
    __metadata("design:type", String)
], BlazerBodyMeasurement.prototype, "nickName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "unit" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "height" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "height", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "weight" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "age" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "shoulder" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "shoulder", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "chest" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "chest", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stance" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "stance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "stomach" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "stomach", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "bodyFit" }),
    __metadata("design:type", Object)
], BlazerBodyMeasurement.prototype, "bodyFit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "neckValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "neckValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "lengthValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "lengthValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "chestValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "chestValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "stomachValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "stomachValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "seatValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "seatValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "shouldersValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "shouldersValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "sleeveLengthValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "sleeveLengthValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "bicepsValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "bicepsValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "wristValue" }),
    __metadata("design:type", Number)
], BlazerBodyMeasurement.prototype, "wristValue", void 0);
exports.BlazerBodyMeasurement = BlazerBodyMeasurement = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_USER_MEASUREMENT_BLAZER_BODY",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], BlazerBodyMeasurement);
