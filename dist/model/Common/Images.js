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
exports.Image = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Image = class Image extends sequelize_typescript_1.Model {
};
exports.Image = Image;
Image.IMAGE_TABLE_NAME = "LAPEL_IMAGE";
Image.IMAGE_ID = "id";
Image.IMAGE_NAME = "imageName";
Image.IMAGE_DATA = "imageData";
Image.IMAGE_URL = "imageURL";
Image.IMAGE_LOCATION = "imagelocation";
Image.IMAGE_DESCRIPTION = "imageDescription";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Image.IMAGE_ID }),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: Image.IMAGE_NAME }),
    __metadata("design:type", String)
], Image.prototype, "imageName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BLOB('long'), field: Image.IMAGE_DATA }),
    __metadata("design:type", Buffer)
], Image.prototype, "imageData", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), field: Image.IMAGE_URL }),
    __metadata("design:type", String)
], Image.prototype, "imageURL", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT('long'), field: Image.IMAGE_LOCATION }),
    __metadata("design:type", String)
], Image.prototype, "imagelocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: Image.IMAGE_DESCRIPTION }),
    __metadata("design:type", String)
], Image.prototype, "imageDescription", void 0);
exports.Image = Image = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_IMAGE",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Image);
