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
exports.Supplier = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Supplier = class Supplier extends sequelize_typescript_1.Model {
};
exports.Supplier = Supplier;
Supplier.SUPPLIER_TABLE_NAME = "LAPEL_SUPPLIER";
Supplier.SUPPLIER_ID = "id";
Supplier.SUPPLIER_NAME = "name";
Supplier.SUPPLIER_DESCRIPTION = "description";
Supplier.SUPPLIER_CONTACT_NO = "contactNo";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Supplier.SUPPLIER_ID }),
    __metadata("design:type", Number)
], Supplier.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: Supplier.SUPPLIER_NAME }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: Supplier.SUPPLIER_DESCRIPTION }),
    __metadata("design:type", String)
], Supplier.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), field: Supplier.SUPPLIER_CONTACT_NO }),
    __metadata("design:type", String)
], Supplier.prototype, "contactNo", void 0);
exports.Supplier = Supplier = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_SUPPLIER",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Supplier);
