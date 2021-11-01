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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = exports.getRefreshTokens = exports.updateRefreshToken = exports.refreshAccessToken = exports.createAccessToken = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var client_1 = require("@prisma/client");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var jwt_utils_1 = require("../utils/jwt.utils");
dotenv_1.default.config();
var prisma = new client_1.PrismaClient();
var createAccessToken = function (user, userAgent) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(process.env.REFRESH_TOKEN_TIMEOUT);
                return [4 /*yield*/, createRefreshToken((0, jwt_utils_1.signToken)({ user: user.id, role: user.role }, process.env.REFRESH_TOKEN_TIMEOUT), user.id, userAgent)];
            case 1:
                refreshToken = _a.sent();
                console.log(refreshToken);
                token = (0, jwt_utils_1.signToken)({ user: user.id, role: user.role, token: refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.id }, process.env.ACCESS_TOKEN_TIMEOUT);
                return [2 /*return*/, token];
        }
    });
}); };
exports.createAccessToken = createAccessToken;
var refreshAccessToken = function (user, refreshTokenId) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshed, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.updateRefreshToken)(refreshTokenId, {
                    token: (0, jwt_utils_1.signToken)({ user: user.id, role: user.role }, process.env.REFRESH_TOKEN_TIMEOUT),
                })];
            case 1:
                refreshed = _a.sent();
                accessToken = null;
                if (refreshed) {
                    accessToken = (0, jwt_utils_1.signToken)({ user: user.id, role: user.role, token: refreshTokenId }, process.env.ACCESS_TOKEN_TIMEOUT);
                }
                return [2 /*return*/, accessToken];
        }
    });
}); };
exports.refreshAccessToken = refreshAccessToken;
var createRefreshToken = function (token, userId, userAgent) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.refreshToken.create({
                        data: { token: token, userId: userId, userAgent: userAgent },
                    })];
            case 2:
                refreshToken = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, refreshToken];
        }
    });
}); };
var updateRefreshToken = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var updated, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updated = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.refreshToken.update({
                        data: data,
                        where: { id: id },
                    })];
            case 2:
                _a.sent();
                updated = true;
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, updated];
        }
    });
}); };
exports.updateRefreshToken = updateRefreshToken;
var getRefreshTokens = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, _a, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                feedback = new Feedback_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = feedback;
                return [4 /*yield*/, prisma.refreshToken.findMany({
                        where: { userId: userId },
                    })];
            case 2:
                _a.results = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                feedback.success = false;
                feedback.message = "Failed to retrieve data";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getRefreshTokens = getRefreshTokens;
var getRefreshToken = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.refreshToken.findFirst({ where: filter })];
            case 2:
                refreshToken = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, refreshToken];
        }
    });
}); };
exports.getRefreshToken = getRefreshToken;
//# sourceMappingURL=token.services.js.map