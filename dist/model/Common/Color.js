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
exports.Color = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Color = class Color extends sequelize_typescript_1.Model {
};
exports.Color = Color;
Color.COLOR_TABLE_NAME = "LAPEL_COLOR";
Color.COLOR_ID = "id";
Color.COLOR_CODE = "colorCode";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Color.COLOR_ID }),
    __metadata("design:type", Number)
], Color.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), unique: true, field: Color.COLOR_CODE }),
    __metadata("design:type", String)
], Color.prototype, "colorCode", void 0);
exports.Color = Color = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_COLOR",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Color);
