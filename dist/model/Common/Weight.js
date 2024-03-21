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
exports.Weight = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Weight = class Weight extends sequelize_typescript_1.Model {
};
exports.Weight = Weight;
Weight.WEIGHT_TABLE_NAME = "LAPEL_WEIGHT";
Weight.WEIGHT_ID = "id";
Weight.WEIGHT_NAME = "name";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Weight.WEIGHT_ID }),
    __metadata("design:type", Number)
], Weight.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), unique: true, field: Weight.WEIGHT_NAME }),
    __metadata("design:type", String)
], Weight.prototype, "name", void 0);
exports.Weight = Weight = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_WEIGHT",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Weight);
