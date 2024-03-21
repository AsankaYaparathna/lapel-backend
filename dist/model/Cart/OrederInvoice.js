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
exports.OrederInvoice = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CartOrder_1 = require("./CartOrder");
let OrederInvoice = class OrederInvoice extends sequelize_typescript_1.Model {
};
exports.OrederInvoice = OrederInvoice;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], OrederInvoice.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, field: "invoiceNo" }),
    __metadata("design:type", String)
], OrederInvoice.prototype, "invoiceNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, unique: true, field: "date" }),
    __metadata("design:type", String)
], OrederInvoice.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CartOrder_1.CartOrder),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, field: "orderId" }),
    __metadata("design:type", Number)
], OrederInvoice.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "status" }),
    __metadata("design:type", Boolean)
], OrederInvoice.prototype, "status", void 0);
exports.OrederInvoice = OrederInvoice = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })
], OrederInvoice);
