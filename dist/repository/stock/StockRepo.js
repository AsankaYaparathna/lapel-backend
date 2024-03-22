"use strict";
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
exports.StockRepo = void 0;
const RowMaterial_1 = require("../../model/Metirial/RowMaterial/RowMaterial");
const MaterialStock_1 = require("../../model/Metirial/Stock/MaterialStock");
const sequelize_1 = require("sequelize");
const MainStock_1 = require("../../model/Metirial/Stock/MainStock");
const MaterialStockLog_1 = require("../../model/Metirial/Stock/MaterialStockLog");
class StockRepo {
    stockVariants(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customId = model.rowMaterialcustomId;
                const result = yield RowMaterial_1.RowMaterial.findOne({ where: { customId: customId } });
                if (!result) {
                    throw new Error("Row Material not found!");
                }
                const resultMtSt = yield MaterialStock_1.MaterialStock.findOne({
                    where: { [sequelize_1.Op.and]: [{ customId: customId }, { wearhouseId: model.wherehouseId }] }
                });
                if (!resultMtSt) {
                    throw new Error("Row Material stock not found in selected wherehouse!");
                }
                const resultmst = yield MainStock_1.MainStock.findOne({ where: { customId: customId } });
                if (!resultmst) {
                    throw new Error("Row Material Main Stock data not found!");
                }
                const variantValue = parseInt(model.value);
                if (resultMtSt.value < variantValue) {
                    throw new Error("Can't variant the stock - Current stock should grater than variant value!");
                }
                resultMtSt.value = resultMtSt.value - variantValue;
                yield resultMtSt.save();
                const newStockLog = yield MaterialStockLog_1.MaterialStockLog.create({
                    customId: customId,
                    wearhouseId: model.wherehouseId,
                    showroomId: null,
                    value: model.value,
                    reason: "Row Material Stock reduced"
                });
                resultmst.mainStock = resultmst.mainStock - variantValue;
                resultmst.liveStock = resultmst.liveStock - variantValue;
                resultmst.usedStock = resultmst.usedStock + variantValue;
                yield resultmst.save();
            }
            catch (err) {
                throw new Error("Failed to variant Row Material Stock! | " + err.message);
            }
        });
    }
    getLog() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MaterialStockLog_1.MaterialStockLog.findAll();
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get stock log! | " + err.message);
            }
        });
    }
}
exports.StockRepo = StockRepo;
