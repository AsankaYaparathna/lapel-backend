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
exports.TrouserBodyMeasurement = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../../User");
let TrouserBodyMeasurement = class TrouserBodyMeasurement extends sequelize_typescript_1.Model {
};
exports.TrouserBodyMeasurement = TrouserBodyMeasurement;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, field: "customerId" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "nickName" }),
    __metadata("design:type", String)
], TrouserBodyMeasurement.prototype, "nickName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "unit" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "height" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "height", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "weight" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "age" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "waist" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "waist", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "seat" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "seat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "length" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "length", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "bodyFit" }),
    __metadata("design:type", Object)
], TrouserBodyMeasurement.prototype, "bodyFit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "seatValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "seatValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "waistValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "waistValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "trouserLengthValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "trouserLengthValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "thighValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "thighValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "kneeValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "kneeValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "bottomValue" }),
    __metadata("design:type", Number)
], TrouserBodyMeasurement.prototype, "bottomValue", void 0);
exports.TrouserBodyMeasurement = TrouserBodyMeasurement = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_USER_MEASUREMENT_TROUSER_BODY",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], TrouserBodyMeasurement);
