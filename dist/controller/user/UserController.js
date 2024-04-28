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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../model/Customer/User");
const UserRepo_1 = require("../../repository/user/UserRepo");
const Utils_1 = require("../../utils/Utils");
const axios_1 = __importDefault(require("axios"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { SMS_API_BASE_URL = "", SMS_API_TOKEN = "", SMS_OTP_EXP_S = "120", } = process.env;
                const { mobileNumber, fullName, email, password } = req.body;
                const userRepo = new UserRepo_1.UserRepo();
                const existUser = yield userRepo.getByMobileCheck(mobileNumber);
                //const existUserWith = await userRepo.getByEmail(mobileNumber);
                if (existUser) {
                    return res.status(400).json({
                        status: false,
                        message: "Failed to create User!| User with this mobile number already exists!",
                        data: null,
                    });
                }
                const otpCode = (0, Utils_1.generateOTP)();
                const lastUser = yield User_1.User.findOne({ order: [['createdAt', 'DESC']] });
                const customerId = yield (0, Utils_1.generateCustomerId)(lastUser);
                const axiosConfig = { headers: { Authorization: `Bearer ${SMS_API_TOKEN}`, "Content-Type": "application/json", } };
                const smsPayload = {
                    recipient: mobileNumber,
                    sender_id: "Lapel",
                    message: `Customer Id : ${customerId}\nYour OTP is ${otpCode}\nDo not share this code.`,
                };
                const response = yield axios_1.default.post(`${SMS_API_BASE_URL}/sms/send`, smsPayload, axiosConfig);
                if (response.status) {
                    const model = new User_1.User();
                    model.fullName = fullName;
                    model.mobileNumber = mobileNumber;
                    model.email = email;
                    model.password = password;
                    model.otp = otpCode;
                    model.isMobileVerified = false;
                    model.customerId = customerId;
                    model.isActive = true;
                    model.userType = 0;
                    yield userRepo.create(model);
                    res.status(200).json({ status: true, message: "User created successfully! | OTP Send", data: null,
                    });
                }
                else {
                    res.status(400).json({ status: false, message: "Failed to send OTP!", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    startSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { SMS_API_BASE_URL = "", SMS_API_TOKEN = "", MS_OTP_EXP_S = "120", } = process.env;
                const mobile = req.body["mobileNumber"];
                if (mobile) {
                    const userRepo = new UserRepo_1.UserRepo();
                    const existUser = yield userRepo.getByMobileCheck(mobile);
                    if (existUser) {
                        return res.status(200).json({ status: true, message: "Successfully!", data: existUser });
                    }
                    const reqBody = req.body;
                    if (reqBody.fullName == undefined) {
                        return res.status(200).json({ status: false, message: "Data not found!", data: null });
                    }
                    const otpCode = (0, Utils_1.generateOTP)();
                    const lastUser = yield User_1.User.findOne({ order: [['createdAt', 'DESC']], });
                    const customerId = yield (0, Utils_1.generateCustomerId)(lastUser);
                    const tempPassword = yield (0, Utils_1.generateTempPassword)(8);
                    const { fullName, email } = req.body;
                    const axiosConfig = {
                        headers: { Authorization: `Bearer ${SMS_API_TOKEN}`, "Content-Type": "application/json", },
                    };
                    const smsPayload = {
                        recipient: mobile, sender_id: "Lapel",
                        message: `Customer Id : ${customerId}\nTemporary Password : ${tempPassword}\nDo not share this.`,
                    };
                    const response = yield axios_1.default.post(`${SMS_API_BASE_URL}/sms/send`, smsPayload, axiosConfig);
                    if (response.status) {
                        const model = new User_1.User();
                        model.fullName = fullName;
                        model.mobileNumber = mobile;
                        model.email = email;
                        model.password = tempPassword;
                        model.otp = otpCode;
                        model.isMobileVerified = true;
                        model.customerId = customerId;
                        model.isActive = true;
                        yield userRepo.create(model);
                        res.status(200).json({
                            status: true,
                            message: "Sesstion Started!",
                            data: null,
                        });
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: "Failed to send temp password!",
                            data: null,
                        });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    forgetPasswordOtpSend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { SMS_API_BASE_URL = "", SMS_API_TOKEN = "", SMS_OTP_EXP_S = "120", } = process.env;
                const { mobileNumber } = req.body;
                const userRepo = new UserRepo_1.UserRepo();
                const existUser = yield userRepo.getByMobileCheck(mobileNumber);
                if (!existUser) {
                    return res.status(200).json({
                        status: false,
                        message: "Failed!| User with this mobile number does not exists!",
                        data: null,
                    });
                }
                const otpCode = (0, Utils_1.generateOTP)();
                const axiosConfig = {
                    headers: { Authorization: `Bearer ${SMS_API_TOKEN}`, "Content-Type": "application/json" }
                };
                const smsPayload = {
                    recipient: mobileNumber,
                    sender_id: "Lapel",
                    message: `LAPEL\nCustomer Id : ${existUser.customerId}\nYour OTP is ${otpCode}\nDo not share this code.`,
                };
                const response = yield axios_1.default.post(`${SMS_API_BASE_URL}/sms/send`, smsPayload, axiosConfig);
                if (response.status) {
                    existUser.otp = otpCode;
                    existUser.isMobileVerified = false;
                    yield existUser.save();
                    res.status(200).json({
                        status: true,
                        message: "Forget Password successfully! | OTP Send",
                        data: null,
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Failed to send OTP!",
                        data: null,
                    });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mobileNumber, password, otp } = req.body;
                const userRepo = new UserRepo_1.UserRepo();
                const existUser = yield userRepo.getByMobileCheck(mobileNumber);
                if (!existUser) {
                    return res.status(200).json({
                        status: false,
                        message: "Failed!| User with this mobile number does not exists!",
                        data: null,
                    });
                }
                const model = new User_1.User();
                model.mobileNumber = mobileNumber;
                model.password = password;
                model.otp = otp;
                yield userRepo.forgetPassword(model);
                res.status(200).json({
                    status: true,
                    message: "Forget Password successfully!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SMS_API_BASE_URL = process.env.SMS_API_BASE_URL || "";
                const SMS_API_TOKEN = process.env.SMS_API_TOKEN || "";
                const SMS_OTP_EXP_S = process.env.SMS_OTP_EXP_S || "120";
                const mobileNumber = req.body.mobileNumber;
                const existUser = yield new UserRepo_1.UserRepo().getByMobileCheck(mobileNumber);
                if (existUser && !existUser.isMobileVerified) {
                    const otpCode = (0, Utils_1.generateOTP)();
                    const response = yield axios_1.default.post(`${SMS_API_BASE_URL}/sms/send`, {
                        recipient: mobileNumber,
                        sender_id: "Lapel",
                        message: `Your OTP is ${otpCode}. Do not share this code.`,
                    }, {
                        headers: {
                            Authorization: `Bearer ${SMS_API_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (response.status) {
                        const model = new User_1.User();
                        model.mobileNumber = req.body.mobileNumber;
                        model.otp = otpCode;
                        yield new UserRepo_1.UserRepo().updateOtp(model);
                        res.status(200).json({
                            status: true,
                            message: "OTP code is resend",
                            data: User_1.User,
                        });
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: "Failed to send OTP!",
                            data: null,
                        });
                    }
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Otp code is already verifyied",
                        data: null,
                    });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    verifyMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new UserRepo_1.UserRepo().getOtpByUserMobile(req.body.mobileNumber);
                if (result) {
                    const otpVerificationResult = result.otp.toString().match(req.body.otp);
                    if (otpVerificationResult) {
                        yield new UserRepo_1.UserRepo().updateMobileVerificationStatus(result.id, true);
                        res.status(200).json({
                            status: true,
                            message: "Mobile number verified successfully!",
                            data: null,
                        });
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: "Failed to verify OTP!",
                            data: null,
                        });
                    }
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "No OTP found for the given User!",
                        data: null,
                    });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new UserRepo_1.UserRepo().login(req.body.mobileNumber, req.body.password);
                if (result) {
                    res.status(200).json({
                        status: true,
                        message: "Login successfully!",
                        data: req.body.mobileNumber,
                    });
                }
                else {
                    res
                        .status(200)
                        .json({ status: false, message: "Login Failed! Password is incorrect", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.params["id"];
                const modal = new User_1.User();
                modal.fullName = req.body.fullName;
                modal.mobileNumber = mobile;
                modal.email = req.body.email;
                const user = yield new UserRepo_1.UserRepo().update(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    block(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.params["id"];
                var model = {
                    id: req.params["id"],
                    isActive: req.body.isActive
                };
                const user = yield new UserRepo_1.UserRepo().block(model);
                res.status(200).json({
                    status: true,
                    message: "Successfully!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mid = parseInt(req.params["id"]);
                const modal = yield new UserRepo_1.UserRepo().delete(mid);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? mid : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    deleteByMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mobile = req.params["id"];
                const user = yield new UserRepo_1.UserRepo().getByMobileCheck(mobile);
                if (user) {
                    const modal = yield new UserRepo_1.UserRepo().delete(user.id);
                    res.status(200).json({
                        status: modal ? true : false,
                        message: modal ? "Successfully!" : "Data Not Found!",
                        data: modal ? mobile : null,
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Data Not Found!",
                        data: mobile,
                    });
                }
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = yield new UserRepo_1.UserRepo().get();
                res.status(200).json({
                    status: true,
                    message: "Successfully!",
                    data: JSON.parse(JSON.stringify(modal)),
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mid = parseInt(req.params["id"]);
                const modal = yield new UserRepo_1.UserRepo().getById(mid);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    getByMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mobile = req.params["id"];
                const modal = yield new UserRepo_1.UserRepo().getByMobileCheck(mobile);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    //profile
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.params["id"];
                const modal = new User_1.User();
                modal.fullName = req.body.fullName;
                modal.mobileNumber = mobile;
                modal.email = req.body.email;
                const user = yield new UserRepo_1.UserRepo().updateInfo(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    updateSecurity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.mobileNumber = req.params["id"];
                const user = yield new UserRepo_1.UserRepo().updateSecurity(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Password not match!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    updateAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.mobileNumber = req.params["id"];
                const user = yield new UserRepo_1.UserRepo().updateAvatar(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    updateBillingAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.mobileNumber = req.params["id"];
                const user = yield new UserRepo_1.UserRepo().updateBillingAddress(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    updateDeliveryAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modal = req.body;
                modal.mobileNumber = req.params["id"];
                const user = yield new UserRepo_1.UserRepo().updateDeliveryAddress(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    addmobileNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.params["id"];
                const modal = {
                    mobileNumber: mobile,
                    mobileNumber2: req.body.mobileNumber
                };
                const user = yield new UserRepo_1.UserRepo().addmobileNumber(modal);
                res.status(200).json({
                    status: user ? true : false,
                    message: user ? "Successfully!" : "Data Not Found!",
                    data: user ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
    //Measurements
    measurementGetByMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params["id"];
                const modal = yield new UserRepo_1.UserRepo().measurementGetByMobile(id);
                res.status(200).json({
                    status: modal ? true : false,
                    message: modal ? "Successfully!" : "Data Not Found!",
                    data: modal ? modal : null,
                });
            }
            catch (err) {
                res.status(400).json({
                    status: false,
                    message: "" + err,
                    data: null,
                });
            }
        });
    }
}
exports.default = new UserController();
