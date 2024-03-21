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
exports.Opacity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Opacity = class Opacity extends sequelize_typescript_1.Model {
};
exports.Opacity = Opacity;
Opacity.OPACITY_TABLE_NAME = "LAPEL_OPACITY";
Opacity.OPACITY_ID = "id";
Opacity.OPACITY_NAME = "name";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Opacity.OPACITY_ID }),
    __metadata("design:type", Number)
], Opacity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), unique: true, field: Opacity.OPACITY_NAME }),
    __metadata("design:type", String)
], Opacity.prototype, "name", void 0);
exports.Opacity = Opacity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_OPACITY",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Opacity);
