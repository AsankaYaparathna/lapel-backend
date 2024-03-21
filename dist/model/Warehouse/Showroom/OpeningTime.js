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
exports.OpenTime = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Showroom_1 = require("./Showroom");
let OpenTime = class OpenTime extends sequelize_typescript_1.Model {
};
exports.OpenTime = OpenTime;
OpenTime.OPEN_TIME_TABLE_NAME = "LAPEL_SHOWROOM_OPEN_TIME";
OpenTime.OPEN_TIME_ID = "id";
OpenTime.OPEN_TIME_DAY = "day";
OpenTime.OPEN_TIME_FROM = "openFrom";
OpenTime.OPEN_TIME_TO = "openTo";
OpenTime.OPEN_TIME_IS_OPEN = "isOpen";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: OpenTime.OPEN_TIME_ID }),
    __metadata("design:type", Number)
], OpenTime.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), field: OpenTime.OPEN_TIME_DAY }),
    __metadata("design:type", String)
], OpenTime.prototype, "day", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: OpenTime.OPEN_TIME_IS_OPEN }),
    __metadata("design:type", Boolean)
], OpenTime.prototype, "isOpen", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME, field: OpenTime.OPEN_TIME_FROM }),
    __metadata("design:type", String)
], OpenTime.prototype, "openFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME, field: OpenTime.OPEN_TIME_TO }),
    __metadata("design:type", String)
], OpenTime.prototype, "openTo", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Showroom_1.Showroom),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], OpenTime.prototype, "showroomId", void 0);
exports.OpenTime = OpenTime = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_SHOWROOM_OPEN_TIME",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], OpenTime);
