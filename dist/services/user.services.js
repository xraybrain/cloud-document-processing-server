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
exports.editPassword = exports.deleteUser = exports.editUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
var bcryptjs_1 = require("bcryptjs");
var dotenv_1 = __importDefault(require("dotenv"));
var client_1 = require("@prisma/client");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var Pagination_1 = __importDefault(require("../models/Pagination"));
dotenv_1.default.config();
var prisma = new client_1.PrismaClient();
var SALT_ROUND = Number(process.env.SALT_ROUND);
var createUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, salt, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                salt = (0, bcryptjs_1.genSaltSync)(SALT_ROUND);
                user.password = (0, bcryptjs_1.hashSync)(user.password, salt);
                return [4 /*yield*/, prisma.user.create({ data: user })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                feedback.success = false;
                feedback.message = "Failed to create account";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (page, search, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, filter, feedback, totalUsers, pager, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pageSize = 50;
                filter = {};
                feedback = new Feedback_1.default();
                if (search) {
                    filter.OR = [
                        { firstname: { contains: search } },
                        { lastname: { contains: search } },
                        { email: search },
                    ];
                }
                console.log(userId);
                if (userId) {
                    filter.id = { not: userId };
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.user.count({
                        where: filter,
                    })];
            case 2:
                totalUsers = _b.sent();
                pager = new Pagination_1.default(page, pageSize).getPager(totalUsers);
                feedback.page = page;
                feedback.pages = pager.pages;
                _a = feedback;
                return [4 /*yield*/, prisma.user.findMany({
                        where: filter,
                        take: pageSize,
                        skip: pager.start,
                        orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
                    })];
            case 3:
                _a.results = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                feedback.success = false;
                feedback.message = "Failed to retrieve data";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: query,
                    })];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, user];
        }
    });
}); };
exports.getUser = getUser;
var editUser = function (updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, userExists, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!updateData.email) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: updateData.id, email: updateData.email },
                    })];
            case 2:
                userExists = _a.sent();
                if (userExists) {
                    // User has to verify to email
                    updateData.hasVerifiedEmail = false;
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, prisma.user.update({
                    data: updateData,
                    where: { id: updateData.id },
                })];
            case 4:
                _a.sent();
                feedback.result = true;
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.log(error_4);
                feedback.success = false;
                feedback.message = "Failed to update account";
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, feedback];
        }
    });
}); };
exports.editUser = editUser;
var deleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.delete({ where: { id: Number(id) } })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                feedback.success = false;
                feedback.message = "Failed to delete account";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.deleteUser = deleteUser;
var editPassword = function (updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, salt, password, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                salt = (0, bcryptjs_1.genSaltSync)(SALT_ROUND);
                password = (0, bcryptjs_1.hashSync)(updateData.password, salt);
                return [4 /*yield*/, prisma.user.update({
                        data: { password: password },
                        where: { id: updateData.id },
                    })];
            case 2:
                _a.sent();
                feedback.result = true;
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                feedback.success = false;
                feedback.message = "Failed to update account password";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.editPassword = editPassword;
//# sourceMappingURL=user.services.js.map