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
exports.Category = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CategoryType_1 = require("./CategoryType");
let Category = class Category extends sequelize_typescript_1.Model {
};
exports.Category = Category;
Category.CATEGORY_TABLE_NAME = "CATEGORY";
Category.CATEGORY_ID = "id";
Category.CATEGORY_TYPE = "categoryType";
Category.CATEGORY_NAME = "categoryName";
Category.CATEGORY_DESCRIPTION = "categoryDescription";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Category.CATEGORY_ID }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CategoryType_1.CategoryType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Category.prototype, "categoryType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: Category.CATEGORY_NAME }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: Category.CATEGORY_DESCRIPTION }),
    __metadata("design:type", String)
], Category.prototype, "categoryDescription", void 0);
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CATEGORY",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Category);
