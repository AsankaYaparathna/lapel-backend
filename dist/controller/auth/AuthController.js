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
const Utils_1 = require("../../utils/Utils");
const AuthRepo_1 = require("../../repository/auth/AuthRepo");
const Auth_1 = require("../../model/Auth/Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientId, clientSecret } = req.body;
                if (clientId !== process.env.JWT_SC_KEY && clientSecret !== process.env.APP_DATA_HASH_SECRET) {
                    return res.status(401).json({ message: "Unauthorized: Invalid client credentials" });
                }
                const cs = (0, Utils_1.generateSecret)();
                const id = (0, Utils_1.generateId)();
                const model = new Auth_1.Auth();
                model.clientid = id;
                model.clientsecret = cs;
                model.clienturl = req.protocol + '://' + req.get('host');
                yield new AuthRepo_1.AuthRepo().create(model);
                res.status(200).json({ status: true, message: "Auth User created successfully!", data: model });
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    generateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqUrl = req.protocol + '://' + req.get('host');
                const { clientId, clientSecret } = req.body;
                const result = yield new AuthRepo_1.AuthRepo().getById(clientId);
                if (result) {
                    const urlAuth = process.env.URL_AUTH === "true";
                    if (urlAuth) {
                        if (result.clienturl !== reqUrl) {
                            return res.status(403).json({ message: "Unauthorized: Invalid client credentials" });
                        }
                    }
                    if (result.clientsecret.match(clientSecret)) {
                        const expiresIn = parseInt(process.env.JWT_EXPIRESIN || "300"); //5 * 60; // 5 minutes in seconds
                        const token = jsonwebtoken_1.default.sign({ clientId }, process.env.JWT_SC_KEY || "", { expiresIn });
                        res.status(200).json({ status: true, message: "successfully!", data: {
                                token: token,
                                expiresIn: expiresIn
                            } });
                    }
                    else {
                        return res.status(403).json({ message: "Unauthorized: Invalid client credentials" });
                    }
                }
                else {
                    return res.status(401).json({ message: "Unauthorized: Invalid client credentials" });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
    authenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["authorization"];
            const skey = process.env.JWT_SC_KEY || "";
            if (!token) {
                return res.status(400).json({ message: "Unauthorized: Token missing" });
            }
            jsonwebtoken_1.default.verify(token, skey, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Forbidden: Invalid token" });
                }
                req.user = user;
                next();
            });
        });
    }
}
exports.default = new AuthController();
