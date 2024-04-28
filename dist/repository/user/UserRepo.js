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
exports.UserRepo = void 0;
const Images_1 = require("../../model/Common/Images");
const BlazerBodyMeasurement_1 = require("../../model/Customer/Measurements/Blazer/BlazerBodyMeasurement");
const BlazerStandardSize_1 = require("../../model/Customer/Measurements/Blazer/BlazerStandardSize");
const FullBodyMeasurement_1 = require("../../model/Customer/Measurements/FullBody/FullBodyMeasurement");
const ShirtBodyMeasurement_1 = require("../../model/Customer/Measurements/Shirt/ShirtBodyMeasurement");
const ShirtCopyFavorite_1 = require("../../model/Customer/Measurements/Shirt/ShirtCopyFavorite");
const ShirtStandardSize_1 = require("../../model/Customer/Measurements/Shirt/ShirtStandardSize");
const TrouserBodyMeasurement_1 = require("../../model/Customer/Measurements/Trouser/TrouserBodyMeasurement");
const TrouserCopyFavorite_1 = require("../../model/Customer/Measurements/Trouser/TrouserCopyFavorite");
const TrouserStandardSize_1 = require("../../model/Customer/Measurements/Trouser/TrouserStandardSize");
const WaistcoatBodyMeasurement_1 = require("../../model/Customer/Measurements/Waistcoat/WaistcoatBodyMeasurement");
const WaistcoatStandardSize_1 = require("../../model/Customer/Measurements/Waistcoat/WaistcoatStandardSize");
const User_1 = require("../../model/Customer/User");
const Utils_1 = require("../../utils/Utils");
class UserRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encpw = (0, Utils_1.hashPassword)(model.password);
                model.password = encpw;
                yield User_1.User.create({
                    fullName: model.fullName,
                    mobileNumber: model.mobileNumber,
                    email: model.email,
                    password: encpw,
                    otp: model.otp,
                    isMobileVerified: model.isMobileVerified,
                    customerId: model.customerId,
                    isActive: model.isActive,
                    userType: model.userType
                });
            }
            catch (err) {
                const result = yield User_1.User.findOne({ where: { mobileNumber: model.mobileNumber } });
                if (result) {
                    throw new Error("Failed to create User!| User with this mobile number already exists!");
                }
                throw new Error("Failed to create User!| " + err.message);
            }
        });
    }
    forgetPassword(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encpw = (0, Utils_1.hashPassword)(model.password);
                const existUser = yield User_1.User.findOne({ where: { mobileNumber: model.mobileNumber } });
                if (existUser) {
                    if (existUser.otp.toString().match(model.otp.toString())) {
                        existUser.password = encpw;
                        existUser.isMobileVerified = true;
                        yield existUser.save();
                    }
                    else {
                        throw new Error("OTP is invalied!");
                    }
                }
            }
            catch (err) {
                throw new Error("Failed to update password!| | " + err.message);
            }
        });
    }
    verifyPassword(user, providedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, Utils_1.verifyPassword)(user.password, providedPassword);
        });
    }
    updateMobileVerificationStatus(UserId, isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { id: UserId } });
                if (!result) {
                    throw new Error("User not found!");
                }
                result.isMobileVerified = isVerified;
                yield result.save();
            }
            catch (err) {
                throw new Error("Failed to update mobile verification status! | " + err.message);
            }
        });
    }
    getOtpByUserMobile(mobileNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({
                    where: { mobileNumber: mobileNumber },
                    attributes: ['id', 'mobileNumber', 'otp', 'isMobileVerified'],
                });
                if (!result) {
                    throw new Error("User not found!");
                }
                if (result) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error("Failed to get OTP! | " + err.message);
            }
        });
    }
    login(mobileNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({
                    where: { mobileNumber: mobileNumber },
                    attributes: ['id', 'mobileNumber', 'password', 'isMobileVerified', 'isActive'],
                });
                if (!result) {
                    throw new Error("User not found!");
                }
                if (result) {
                    if ((0, Utils_1.verifyPassword)(result.password, password)) {
                        if (!result.isActive) {
                            throw new Error("User account already blocked!");
                        }
                        else if (result.isMobileVerified) {
                            return true;
                        }
                        else {
                            throw new Error("User not verifyied!");
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error("" + err.message);
            }
        });
    }
    update(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                result.fullName = modal.fullName;
                //result.mobileNumber = modal.mobileNumber;
                result.email = modal.email;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    block(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: model.id } });
                if (!result) {
                    return false;
                }
                result.isActive = model.isActive;
                yield result.save();
            }
            catch (err) {
                throw new Error(model.isActive ? "Failed to Block! | " + err.message : "Failed to Unblock! | " + err.message);
            }
        });
    }
    updateOtp(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber }, });
                if (!result) {
                    throw new Error("Data not found!");
                }
                result.otp = modal.otp;
                yield result.save();
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    delete(mId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { id: mId } });
                if (!result) {
                    return null;
                }
                yield result.destroy();
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete! | " + err.message);
            }
        });
    }
    getById(mId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { id: mId } });
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
    getByMobileCheck(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: mobile } });
                if (!result) {
                    return null;
                }
                var image = yield Images_1.Image.findOne({ where: { id: result.avatar } });
                if (image) {
                    result.avatar = image;
                }
                result.billing = JSON.parse(result.billing);
                result.delivery = JSON.parse(result.delivery);
                return result;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { email: email } });
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findAll();
                if (!result) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    element.billing = JSON.parse(element.billing);
                    element.delivery = JSON.parse(element.delivery);
                })));
                return result;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
    //profile
    updateInfo(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                result.fullName = modal.fullName;
                result.email = modal.email;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    updateSecurity(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                const encpw = (0, Utils_1.hashPassword)(modal.newPassword);
                if ((0, Utils_1.verifyPassword)(result.password, modal.currentPassword)) {
                    result.password = encpw;
                    yield result.save();
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    updateAvatar(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                const avatar = yield Images_1.Image.create({
                    imageName: modal.avatar.imageName,
                    imageData: modal.avatar.imageData,
                    imageURL: modal.avatar.imageURL,
                    imagelocation: modal.avatar.imagelocation,
                    imageDescription: modal.avatar.imageDescription,
                });
                result.avatar = avatar.id;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    updateBillingAddress(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                result.billing = modal.billing;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    updateDeliveryAddress(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                if (result.billing == null) {
                    return false;
                }
                const newDelivery = modal.sameAsBilling ? result.billing : modal.delivery;
                result.delivery = newDelivery;
                result.sameAsBilling = modal.sameAsBilling;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to update! | " + err.message);
            }
        });
    }
    addmobileNumber(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: modal.mobileNumber } });
                if (!result) {
                    return false;
                }
                result.mobileNumber2 = modal.mobileNumber2;
                yield result.save();
                return true;
            }
            catch (err) {
                throw new Error("Failed to add mobile Number! | " + err.message);
            }
        });
    }
    measurementGetByMobile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield User_1.User.findOne({ where: { mobileNumber: id } });
                if (!result) {
                    return null;
                }
                const shirtBodyMeasurement = yield ShirtBodyMeasurement_1.ShirtBodyMeasurement.findOne({ where: { customerId: result.id } });
                const shirtCopyFavorite = yield ShirtCopyFavorite_1.ShirtCopyFavorite.findOne({ where: { customerId: result.id } });
                const shirtStandardSize = yield ShirtStandardSize_1.ShirtStandardSize.findOne({ where: { customerId: result.id } });
                const trouserBodyMeasurement = yield TrouserBodyMeasurement_1.TrouserBodyMeasurement.findOne({ where: { customerId: result.id } });
                const trouserCopyFavorite = yield TrouserCopyFavorite_1.TrouserCopyFavorite.findOne({ where: { customerId: result.id } });
                const trouserStandardSize = yield TrouserStandardSize_1.TrouserStandardSize.findOne({ where: { customerId: result.id } });
                const blazerBodyMeasurement = yield BlazerBodyMeasurement_1.BlazerBodyMeasurement.findOne({ where: { customerId: result.id } });
                const blazerStandardSize = yield BlazerStandardSize_1.BlazerStandardSize.findOne({ where: { customerId: result.id } });
                const waistcoatBodyMeasurement = yield WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement.findOne({ where: { customerId: result.id } });
                const waistcoatStandardSize = yield WaistcoatStandardSize_1.WaistcoatStandardSize.findOne({ where: { customerId: result.id } });
                const fullBodyMeasurement = yield FullBodyMeasurement_1.FullBodyMeasurement.findOne({ where: { customerId: result.id } });
                // var measurementData = {
                //   shirt : {
                //     bodyMeasurement : shirtBodyMeasurement,
                //     standerdSize : shirtStandardSize,
                //     copyFavorite : shirtCopyFavorite,
                //   },
                //   trouser : {
                //     bodyMeasurement : trouserBodyMeasurement,
                //     standerdSize : trouserStandardSize,
                //     copyFavorite : trouserCopyFavorite,
                //   },
                //   blazer : {
                //     bodyMeasurement : blazerBodyMeasurement,
                //     standerdSize : blazerStandardSize,
                //   },
                //   waistcoat : {
                //     bodyMeasurement : waistcoatBodyMeasurement,
                //     standerdSize : waistcoatStandardSize,
                //   },
                //   fullBody : {
                //     bodyMeasurement : fullBodyMeasurement
                //   }
                // }
                var measurementData = [
                    {
                        customProduct: 'Shirt',
                        measurementType: 'Body Measurement',
                        data: shirtBodyMeasurement
                    },
                    {
                        customProduct: 'Shirt',
                        measurementType: 'Standard Size',
                        data: shirtStandardSize
                    },
                    {
                        customProduct: 'Shirt',
                        measurementType: 'Copy Favorite',
                        data: shirtCopyFavorite
                    },
                    {
                        customProduct: 'Trouser',
                        measurementType: 'Body Measurement',
                        data: trouserBodyMeasurement
                    },
                    {
                        customProduct: 'Trouser',
                        measurementType: 'Standard Size',
                        data: trouserStandardSize
                    },
                    {
                        customProduct: 'Trouser',
                        measurementType: 'Copy Favorite',
                        data: trouserCopyFavorite
                    },
                    {
                        customProduct: 'Blazer',
                        measurementType: 'Body Measurement',
                        data: blazerBodyMeasurement
                    },
                    {
                        customProduct: 'Blazer',
                        measurementType: 'Standard Size',
                        data: blazerStandardSize
                    },
                    {
                        customProduct: 'Waistcoat',
                        measurementType: 'Body Measurement',
                        data: waistcoatBodyMeasurement
                    },
                    {
                        customProduct: 'Waistcoat',
                        measurementType: 'Standard Size',
                        data: waistcoatStandardSize
                    },
                    {
                        customProduct: 'FullBody',
                        measurementType: 'Body Measurement',
                        data: fullBodyMeasurement
                    },
                ];
                return measurementData;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
}
exports.UserRepo = UserRepo;
