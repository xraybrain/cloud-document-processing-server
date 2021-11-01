"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteShare = exports.getSharedWithMembers = exports.generateShareLink = exports.getSharedDocuments = exports.shareDocument = void 0;
var client_1 = require("@prisma/client");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var Pagination_1 = __importDefault(require("../models/Pagination"));
var jwt_utils_1 = require("../utils/jwt.utils");
var nodemailer_utils_1 = require("../utils/nodemailer.utils");
var prisma = new client_1.PrismaClient();
var shareDocument = function (docId, userId, owner) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, user, version, alreadyShared, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                return [4 /*yield*/, prisma.user.findFirst({ where: { id: userId } })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 11];
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: docId, isCurrent: true },
                    })];
            case 3:
                version = _a.sent();
                if (!version) return [3 /*break*/, 9];
                return [4 /*yield*/, prisma.share.findFirst({
                        where: { versionId: docId, userId: userId },
                    })];
            case 4:
                alreadyShared = _a.sent();
                if (!!alreadyShared) return [3 /*break*/, 7];
                return [4 /*yield*/, prisma.share.create({
                        data: {
                            versionId: docId,
                            userId: userId,
                        },
                    })];
            case 5:
                _a.sent();
                // Send notification mail
                return [4 /*yield*/, (0, nodemailer_utils_1.sendMail)({
                        to: "" + user.email,
                        from: "<myproject2019@aol.com>",
                        subject: owner.firstname + " " + owner.lastname + " (via Cloudify)",
                        html: "\n              <p>\n                Hi, " + user.firstname + " " + user.lastname + "!\n              </p>\n              <p>\n                " + owner.firstname + " " + owner.lastname + " (<a href=\"mailto:" + owner.email + "\">" + owner.email + "</a>) Shared \"<b>" + (version === null || version === void 0 ? void 0 : version.name) + "</b>\" with you on Cloudify.\n              </p>\n              <br>\n              <br>\n              <a href=\"" + process.env.DOMAIN + "\" style=\"background-color: #dc3545; color: #fff; padding: 0.8rem;display: inline-block; text-decoration: none\">\n              Login\n              </a>\n              <br>\n              <br>\n              <p>\n                Enjoy!\n              </p>\n              <p>\n                The Cloudify Team\n              </p>\n          ",
                    })];
            case 6:
                // Send notification mail
                _a.sent();
                feedback.message = "Shared!";
                return [3 /*break*/, 8];
            case 7:
                feedback.success = false;
                feedback.message = "Already shared";
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                feedback.message = "Document does not exists";
                feedback.success = false;
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                feedback.message = "User does not exists";
                feedback.success = false;
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _a.sent();
                console.log(error_1);
                feedback.message = "Failed to share document";
                feedback.success = false;
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/, feedback];
        }
    });
}); };
exports.shareDocument = shareDocument;
var getSharedDocuments = function (page, user) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, feedback, totalShared, pager, temp, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageSize = 20;
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.share.count({
                        where: { userId: user.id },
                    })];
            case 2:
                totalShared = _a.sent();
                pager = new Pagination_1.default(page, pageSize).getPager(totalShared);
                feedback.page = page;
                feedback.pages = pager.pages;
                return [4 /*yield*/, prisma.share.findMany({
                        where: { userId: user.id, deletedAt: { equals: undefined } },
                        take: pageSize,
                        skip: pager.start,
                        include: { version: { include: { document: true } } },
                        orderBy: [{ createdAt: "desc" }],
                    })];
            case 3:
                temp = _a.sent();
                feedback.results = temp.map(function (d) { return (__assign(__assign({}, d.version), { isOwner: false })); });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                feedback.success = false;
                feedback.message = "Failed to retrieve shared documents";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getSharedDocuments = getSharedDocuments;
var generateShareLink = function (docId, user) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, token;
    return __generator(this, function (_a) {
        feedback = new Feedback_1.default();
        token = (0, jwt_utils_1.signToken)({ user: user.id, doc: docId }, "30d");
        feedback.result = process.env.DOMAIN + "sharer?token=" + token;
        feedback.message = "Link expires in 30 days";
        return [2 /*return*/, feedback];
    });
}); };
exports.generateShareLink = generateShareLink;
var getSharedWithMembers = function (docId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, result, owner, temp, shares, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: docId },
                        include: {
                            shares: {
                                include: {
                                    user: {
                                        select: {
                                            firstname: true,
                                            lastname: true,
                                            id: true,
                                            image: true,
                                        },
                                    },
                                },
                            },
                            document: {
                                include: {
                                    user: {
                                        select: {
                                            firstname: true,
                                            lastname: true,
                                            image: true,
                                            id: true,
                                        },
                                    },
                                },
                            },
                        },
                    })];
            case 2:
                result = _a.sent();
                owner = __assign(__assign({}, result === null || result === void 0 ? void 0 : result.document.user), { isOwner: true });
                temp = [owner];
                temp.push();
                if (Array.isArray(result === null || result === void 0 ? void 0 : result.shares)) {
                    shares = result === null || result === void 0 ? void 0 : result.shares;
                    temp = temp.concat(shares.map(function (d) { return d.user; }));
                }
                feedback.results = temp;
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                feedback.success = false;
                feedback.message = "Failed to retrieve members";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getSharedWithMembers = getSharedWithMembers;
var deleteShare = function (docId, user) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, share, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prisma.share.findFirst({
                        where: { versionId: docId, userId: user },
                    })];
            case 2:
                share = _a.sent();
                if (!share) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.share.delete({
                        where: { id: share.id },
                    })];
            case 3:
                _a.sent();
                feedback.message = "Deleted!";
                return [3 /*break*/, 5];
            case 4: throw new Error("Failed to delete");
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                feedback.message = "Failed to perform request";
                feedback.success = false;
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, feedback];
        }
    });
}); };
exports.deleteShare = deleteShare;
//# sourceMappingURL=share.services.js.map