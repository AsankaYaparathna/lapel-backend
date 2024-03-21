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
exports.UserWaistcoatMeasurementRepo = void 0;
const WaistcoatBodyMeasurement_1 = require("../../../model/Customer/Measurements/Waistcoat/WaistcoatBodyMeasurement");
const WaistcoatStandardSize_1 = require("../../../model/Customer/Measurements/Waistcoat/WaistcoatStandardSize");
class UserWaistcoatMeasurementRepo {
    //body
    bodyMeasurementCreate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement.create(model);
            }
            catch (err) {
                throw new Error("Failed to create User measurement!| " + err.message);
            }
        });
    }
    bodyMeasurementUpdate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement.findOne({ where: { id: model.id } });
                if (result) {
                    yield result.update(model);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw new Error("Failed to add User measurement!| " + err.message);
            }
        });
    }
    bodyMeasurementDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement.findOne({ where: { id: id } });
                if (result) {
                    yield result.destroy();
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Failed to delete shirt body measurement: " + error);
            }
        });
    }
    bodyMeasurementGetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement.findOne({ where: { id: id } });
                return result;
            }
            catch (error) {
                throw new Error("Failed to get shirt body measurement by ID: " + error);
            }
        });
    }
    //standerd
    standardSizecreate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield WaistcoatStandardSize_1.WaistcoatStandardSize.create(model);
            }
            catch (err) {
                throw new Error("Failed to create User!| " + err.message);
            }
        });
    }
    standardSizeUpdate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatStandardSize_1.WaistcoatStandardSize.findByPk(model.id);
                if (result) {
                    yield result.update(model);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Failed to update shirt standard size: " + error);
            }
        });
    }
    standardSizeGetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatStandardSize_1.WaistcoatStandardSize.findByPk(id);
                return result;
            }
            catch (error) {
                throw new Error("Failed to get shirt standard size by ID: " + error);
            }
        });
    }
    standardSizeDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield WaistcoatStandardSize_1.WaistcoatStandardSize.findByPk(id);
                if (result) {
                    yield result.destroy();
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Failed to delete shirt standard size: " + error);
            }
        });
    }
}
exports.UserWaistcoatMeasurementRepo = UserWaistcoatMeasurementRepo;
