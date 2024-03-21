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
exports.CartOrderLog = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CartOrder_1 = require("./CartOrder");
let CartOrderLog = class CartOrderLog extends sequelize_typescript_1.Model {
    static generateCustomId(instance) {
        instance.customId = "COL" + instance.id.toString().padStart(4, '0');
    }
};
exports.CartOrderLog = CartOrderLog;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CartOrderLog.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CartOrder_1.CartOrder),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "orderId" }),
    __metadata("design:type", Number)
], CartOrderLog.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "user" }),
    __metadata("design:type", Object)
], CartOrderLog.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "action" }),
    __metadata("design:type", String)
], CartOrderLog.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "type" }),
    __metadata("design:type", Object)
], CartOrderLog.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "status" }),
    __metadata("design:type", Boolean)
], CartOrderLog.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], CartOrderLog.prototype, "customId", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartOrderLog]),
    __metadata("design:returntype", void 0)
], CartOrderLog, "generateCustomId", null);
exports.CartOrderLog = CartOrderLog = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_USER_CART_LOG", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })
], CartOrderLog);
