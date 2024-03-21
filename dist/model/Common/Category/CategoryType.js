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
exports.CategoryType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let CategoryType = class CategoryType extends sequelize_typescript_1.Model {
};
exports.CategoryType = CategoryType;
CategoryType.CATEGORY_TYPE_TABLE_NAME = "LAPEL_CATEGORY_TYPE";
CategoryType.CATEGORY_TYPE_ID = "id";
CategoryType.CATEGORY_TYPE_NAME = "typeName";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: CategoryType.CATEGORY_TYPE_ID }),
    __metadata("design:type", Number)
], CategoryType.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), unique: true, field: CategoryType.CATEGORY_TYPE_NAME }),
    __metadata("design:type", String)
], CategoryType.prototype, "typeName", void 0);
exports.CategoryType = CategoryType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CATEGORY_TYPE",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CategoryType);
