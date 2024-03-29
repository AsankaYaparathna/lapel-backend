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
exports.Series = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Series = class Series extends sequelize_typescript_1.Model {
};
exports.Series = Series;
Series.SERIES_TABLE_NAME = "LAPEL_SERIES";
Series.SERIES_ID = "id";
Series.SERIES_NAME = "name";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Series.SERIES_ID }),
    __metadata("design:type", Number)
], Series.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), unique: true, field: Series.SERIES_NAME }),
    __metadata("design:type", String)
], Series.prototype, "name", void 0);
exports.Series = Series = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_SERIES",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Series);
