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
exports.AuthRepo = void 0;
const Auth_1 = require("../../model/Auth/Auth");
class AuthRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Auth_1.Auth.create({
                    clientid: model.clientid,
                    clientsecret: model.clientsecret,
                    clienturl: model.clienturl,
                });
            }
            catch (err) {
                const result = yield Auth_1.Auth.findOne({ where: { clientid: model.clientid } });
                if (result) {
                    throw new Error("Failed to create Auth User!| Auth User already exists!");
                    return;
                }
                throw new Error("Failed to create Auth User!| | " + err.message);
            }
        });
    }
    getById(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Auth_1.Auth.findOne({ where: { clientid: cid } });
                if (!result) {
                    throw new Error("Data not found!");
                }
                return result;
            }
            catch (err) {
                throw new Error("Failed to get! | " + err.message);
            }
        });
    }
}
exports.AuthRepo = AuthRepo;
