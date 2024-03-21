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
exports.Showroom = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const OpeningTime_1 = require("./OpeningTime");
const ShowroomImages_1 = require("./ShowroomImages");
let Showroom = class Showroom extends sequelize_typescript_1.Model {
};
exports.Showroom = Showroom;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], Showroom.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], Showroom.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "address" }),
    __metadata("design:type", Object)
], Showroom.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "googleLocation" }),
    __metadata("design:type", String)
], Showroom.prototype, "googleLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "contactNo" }),
    __metadata("design:type", Object)
], Showroom.prototype, "contactNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], Showroom.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ShowroomImages_1.ShowroomImages, { foreignKey: "imageList" }),
    __metadata("design:type", Array)
], Showroom.prototype, "imageList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => OpeningTime_1.OpenTime, { foreignKey: "timeList" }),
    __metadata("design:type", Array)
], Showroom.prototype, "timeList", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isLive" }),
    __metadata("design:type", Boolean)
], Showroom.prototype, "isLive", void 0);
exports.Showroom = Showroom = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_SHOWROOM",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Showroom);
