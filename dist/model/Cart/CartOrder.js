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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartOrder = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../Customer/User");
let CartOrder = class CartOrder extends sequelize_typescript_1.Model {
    static generateCustomId(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            instance.customId = "ORD" + instance.id.toString().padStart(4, '0');
            yield instance.save();
        });
    }
};
exports.CartOrder = CartOrder;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CartOrder.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "customId" }),
    __metadata("design:type", String)
], CartOrder.prototype, "customId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, field: "customerId" }),
    __metadata("design:type", Number)
], CartOrder.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "firstName" }),
    __metadata("design:type", String)
], CartOrder.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "lastName" }),
    __metadata("design:type", String)
], CartOrder.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "mobile" }),
    __metadata("design:type", String)
], CartOrder.prototype, "mobile", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "mobile2" }),
    __metadata("design:type", String)
], CartOrder.prototype, "mobile2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "email" }),
    __metadata("design:type", String)
], CartOrder.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "billing" }),
    __metadata("design:type", Object)
], CartOrder.prototype, "billing", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "deliveryMethod" }),
    __metadata("design:type", Object)
], CartOrder.prototype, "deliveryMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, field: "deliveryDate" }),
    __metadata("design:type", Date)
], CartOrder.prototype, "deliveryDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "notes" }),
    __metadata("design:type", String)
], CartOrder.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "status" }),
    __metadata("design:type", Boolean)
], CartOrder.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "orderStatus" }),
    __metadata("design:type", String)
], CartOrder.prototype, "orderStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "cartIdList" }),
    __metadata("design:type", Array)
], CartOrder.prototype, "cartIdList", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "payment" }),
    __metadata("design:type", Object)
], CartOrder.prototype, "payment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "amount" }),
    __metadata("design:type", Object)
], CartOrder.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "orderDiscount" }),
    __metadata("design:type", Array)
], CartOrder.prototype, "orderDiscount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: "orderExtraCharges" }),
    __metadata("design:type", Array)
], CartOrder.prototype, "orderExtraCharges", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: "specialNote" }),
    __metadata("design:type", String)
], CartOrder.prototype, "specialNote", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartOrder]),
    __metadata("design:returntype", Promise)
], CartOrder, "generateCustomId", null);
exports.CartOrder = CartOrder = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })
], CartOrder);
;
;
;
;
;
;
;
;
;
