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
const SessionRepo_1 = require("../../repository/session/SessionRepo");
class SessionController {
    startSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new SessionRepo_1.SessionRepo().startSession(req.body);
                if (result[0]) {
                    res.status(200).json({
                        status: true,
                        message: "Successfully!",
                        data: result,
                    });
                }
                else {
                    res.status(400)
                        .json({ status: false, message: "Cart data is not found", data: null });
                }
            }
            catch (err) {
                res.status(400).json({ status: false, message: "" + err, data: null });
            }
        });
    }
}
exports.default = new SessionController();
