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
exports.UserShirtMeasurementRepo = void 0;
const ShirtBodyMeasurement_1 = require("../../../model/Customer/Measurements/Shirt/ShirtBodyMeasurement");
const ShirtCopyFavorite_1 = require("../../../model/Customer/Measurements/Shirt/ShirtCopyFavorite");
const ShirtStandardSize_1 = require("../../../model/Customer/Measurements/Shirt/ShirtStandardSize");
class UserShirtMeasurementRepo {
    //body
    shirtBodyMeasurementCreate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ShirtBodyMeasurement_1.ShirtBodyMeasurement.create(model);
            }
            catch (err) {
                throw new Error("Failed to create User measurement!| " + err.message);
            }
        });
    }
    shirtBodyMeasurementUpdate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtBodyMeasurement_1.ShirtBodyMeasurement.findOne({ where: { id: model.id } });
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
    shirtBodyMeasurementDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtBodyMeasurement_1.ShirtBodyMeasurement.findOne({ where: { id: id } });
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
    getShirtBodyMeasurementById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtBodyMeasurement_1.ShirtBodyMeasurement.findOne({ where: { id: id } });
                return result;
            }
            catch (error) {
                throw new Error("Failed to get shirt body measurement by ID: " + error);
            }
        });
    }
    //standerd
    shirtStanSizeMeasurementCreate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ShirtStandardSize_1.ShirtStandardSize.create(model);
            }
            catch (err) {
                throw new Error("Failed to create User!| " + err.message);
            }
        });
    }
    updateShirtStandardSize(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtStandardSize_1.ShirtStandardSize.findByPk(model.id);
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
    getShirtStandardSizeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtStandardSize_1.ShirtStandardSize.findByPk(id);
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
                const result = yield ShirtStandardSize_1.ShirtStandardSize.findByPk(id);
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
    //copyFav
    shirtCopyFavurementCreate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ShirtCopyFavorite_1.ShirtCopyFavorite.create(model);
            }
            catch (err) {
                throw new Error("Failed to create User!| " + err.message);
            }
        });
    }
    updateShirtCopyFav(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtCopyFavorite_1.ShirtCopyFavorite.findByPk(model.id);
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
    getShirtCopyFavById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtCopyFavorite_1.ShirtCopyFavorite.findByPk(id);
                return result;
            }
            catch (error) {
                throw new Error("Failed to get shirt standard size by ID: " + error);
            }
        });
    }
    deleteShirtCopyFav(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ShirtCopyFavorite_1.ShirtCopyFavorite.findByPk(id);
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
exports.UserShirtMeasurementRepo = UserShirtMeasurementRepo;
