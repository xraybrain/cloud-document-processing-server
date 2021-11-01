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
exports.deleteComment = exports.editComment = exports.getComments = exports.createComment = void 0;
var client_1 = require("@prisma/client");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var Pagination_1 = __importDefault(require("../models/Pagination"));
var prisma = new client_1.PrismaClient();
var createComment = function (data, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, id, comment, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.comment.create({
                        data: {
                            content: data.content,
                            documentId: data.docId,
                            userId: userId,
                        },
                    })];
            case 2:
                id = (_a.sent()).id;
                // register activity
                return [4 /*yield*/, prisma.activity.create({
                        data: {
                            content: "commented",
                            documentId: data.docId,
                            userId: userId,
                        },
                    })];
            case 3:
                // register activity
                _a.sent();
                return [4 /*yield*/, prisma.comment.findFirst({
                        where: { id: id },
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
                    })];
            case 4:
                comment = _a.sent();
                feedback.result = comment;
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                feedback.success = false;
                feedback.message = "Failed to post comment";
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, feedback];
        }
    });
}); };
exports.createComment = createComment;
var getComments = function (page, docId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, pageSize, totalComments, pager, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                feedback = new Feedback_1.default();
                pageSize = 15;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.comment.count({
                        where: { documentId: docId },
                    })];
            case 2:
                totalComments = _b.sent();
                pager = new Pagination_1.default(page, pageSize).getPager(totalComments);
                feedback.page = page;
                feedback.pages = pager.pages;
                _a = feedback;
                return [4 /*yield*/, prisma.comment.findMany({
                        where: { documentId: docId },
                        skip: pager.start,
                        take: pageSize,
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
                    })];
            case 3:
                _a.results = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                feedback.success = false;
                feedback.message = "Failed to retrieve comments";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getComments = getComments;
var editComment = function (content, id) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.comment.update({ data: { content: content }, where: { id: id } })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                feedback.success = false;
                feedback.message = "Failed to edit comment";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.editComment = editComment;
var deleteComment = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.comment.delete({ where: { id: id } })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                feedback.success = false;
                feedback.message = "Failed to delete comment";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.services.js.map