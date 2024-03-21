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
exports.RowMaterialImages = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Images_1 = require("../../Common/Images");
const RowMaterial_1 = require("./RowMaterial");
let RowMaterialImages = class RowMaterialImages extends sequelize_typescript_1.Model {
};
exports.RowMaterialImages = RowMaterialImages;
RowMaterialImages.FABRIC_IMAGE_TABLE_NAME = "LAPEL_ROW_METERIAL_IMAGE";
RowMaterialImages.FABRIC_IMAGE_ID = "id";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: RowMaterialImages.FABRIC_IMAGE_ID }),
    __metadata("design:type", Number)
], RowMaterialImages.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => RowMaterial_1.RowMaterial),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RowMaterialImages.prototype, "rowMaterialId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Images_1.Image),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RowMaterialImages.prototype, "imageId", void 0);
exports.RowMaterialImages = RowMaterialImages = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_ROW_METERIAL_IMAGE",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], RowMaterialImages);
