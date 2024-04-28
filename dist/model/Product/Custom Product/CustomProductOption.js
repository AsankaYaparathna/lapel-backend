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
exports.CustomProductOption = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CustomProduct_1 = require("./CustomProduct");
const SubOption_1 = require("./SubOption");
let CustomProductOption = class CustomProductOption extends sequelize_typescript_1.Model {
};
exports.CustomProductOption = CustomProductOption;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CustomProductOption.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CustomProduct_1.CustomProduct),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "customProductId" }),
    __metadata("design:type", Number)
], CustomProductOption.prototype, "customProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "name" }),
    __metadata("design:type", String)
], CustomProductOption.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "image" }),
    __metadata("design:type", String)
], CustomProductOption.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "style" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "style", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "contrast" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "contrast", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "accent" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "accent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "optionGroup" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "optionGroup", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "hidden" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "hidden", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "front" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "front", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "back" }),
    __metadata("design:type", Boolean)
], CustomProductOption.prototype, "back", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "description" }),
    __metadata("design:type", String)
], CustomProductOption.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "hideRules" }),
    __metadata("design:type", Array)
], CustomProductOption.prototype, "hideRules", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "defaultLoadingOption" }),
    __metadata("design:type", Array)
], CustomProductOption.prototype, "defaultLoadingOption", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "frontViewOrder" }),
    __metadata("design:type", Number)
], CustomProductOption.prototype, "frontViewOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "backViewOrder" }),
    __metadata("design:type", Number)
], CustomProductOption.prototype, "backViewOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SubOption_1.SubOption, { foreignKey: "subOptions" }),
    __metadata("design:type", Array)
], CustomProductOption.prototype, "subOptions", void 0);
exports.CustomProductOption = CustomProductOption = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT_OPTION",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CustomProductOption);
