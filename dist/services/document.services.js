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
exports.getStarredDocuments = exports.starDocument = exports.renameDocument = exports.moveDocuments = exports.copyDocuments = exports.deleteDocuments = exports.getDocument = exports.getDocuments = exports.createFolder = exports.createDocuments = void 0;
var client_1 = require("@prisma/client");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var Pagination_1 = __importDefault(require("../models/Pagination"));
var prisma = new client_1.PrismaClient();
var createDocuments = function (rawDocuments, userId, folderId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, fid, _i, rawDocuments_1, raw, sameCount, version, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                fid = folderId || null;
                _i = 0, rawDocuments_1 = rawDocuments;
                _a.label = 1;
            case 1:
                if (!(_i < rawDocuments_1.length)) return [3 /*break*/, 7];
                raw = rawDocuments_1[_i];
                return [4 /*yield*/, prisma.documentVersion.count({
                        where: { name: { startsWith: raw.name }, folderId: folderId },
                    })];
            case 2:
                sameCount = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, prisma.documentVersion.create({
                        data: {
                            name: sameCount === 0 ? raw.name : raw.name + " (Copy " + sameCount + ")",
                            size: raw.size,
                            folderId: fid,
                            userId: userId,
                            document: {
                                create: {
                                    mimeType: raw.type,
                                    extension: raw.extension,
                                    url: raw.url,
                                    userId: userId,
                                },
                            },
                        },
                    })];
            case 4:
                version = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                feedback.message += "Failed to save " + raw.name + " ";
                feedback.success = false;
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, feedback];
        }
    });
}); };
exports.createDocuments = createDocuments;
var createFolder = function (raw, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, exists, version, doc, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { name: raw.name, folderId: raw.folderId, userId: userId },
                    })];
            case 2:
                exists = _a.sent();
                if (!!exists) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.documentVersion.create({
                        data: {
                            name: raw.name,
                            folderId: raw.folderId,
                            userId: userId,
                            document: {
                                create: {
                                    isFolder: true,
                                    userId: userId,
                                },
                            },
                        },
                    })];
            case 3:
                version = _a.sent();
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: version.id },
                        include: { document: true },
                    })];
            case 4:
                doc = _a.sent();
                feedback.result = doc;
                // register activity
                return [4 /*yield*/, prisma.activity.create({
                        data: {
                            content: "created new folder",
                            documentId: Number(doc === null || doc === void 0 ? void 0 : doc.document.id),
                            userId: userId,
                        },
                    })];
            case 5:
                // register activity
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                feedback.success = false;
                feedback.message = raw.name + " already exists";
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                feedback.success = false;
                feedback.message = "Failed to create folder " + raw.name;
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/, feedback];
        }
    });
}); };
exports.createFolder = createFolder;
var getDocuments = function (page, userId, folderId, star, search, isFolder) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, filter, feedback, totalDocuments, pager, temp, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageSize = 20;
                filter = {
                    folderId: folderId || null,
                    userId: userId,
                    isCurrent: true,
                    deletedAt: { equals: null },
                };
                feedback = new Feedback_1.default();
                if (search)
                    filter.name = { contains: search };
                if (star)
                    filter.isStarred = true;
                if (isFolder) {
                    filter.document = { isFolder: isFolder };
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.documentVersion.count({
                        where: filter,
                    })];
            case 2:
                totalDocuments = _a.sent();
                pager = new Pagination_1.default(page, pageSize).getPager(totalDocuments);
                feedback.page = page;
                feedback.pages = pager.pages;
                return [4 /*yield*/, prisma.documentVersion.findMany({
                        where: filter,
                        take: pageSize,
                        skip: pager.start,
                        include: { document: true },
                        orderBy: [{ document: { isFolder: "desc" } }, { name: "asc" }],
                    })];
            case 3:
                temp = _a.sent();
                feedback.results = temp.map(function (d) { return (__assign(__assign({}, d), { isOwner: true })); });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                feedback.success = false;
                feedback.message = "Failed to retrieve data";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getDocuments = getDocuments;
var getDocument = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, _a, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                feedback = new Feedback_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = feedback;
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: id },
                        include: { document: true },
                    })];
            case 2:
                _a.result = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                feedback.success = false;
                feedback.message = "Failed to retrieve document";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getDocument = getDocument;
var deleteDocuments = function (ids, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, updates, activites, _i, ids_1, id, version, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                updates = [];
                activites = [];
                _i = 0, ids_1 = ids;
                _a.label = 2;
            case 2:
                if (!(_i < ids_1.length)) return [3 /*break*/, 5];
                id = ids_1[_i];
                return [4 /*yield*/, prisma.documentVersion.findFirst({ where: { id: id } })];
            case 3:
                version = _a.sent();
                updates.push(prisma.documentVersion.update({
                    data: {
                        deletedAt: new Date(),
                    },
                    where: { id: id },
                }));
                activites.push({
                    content: "deleted " + (version === null || version === void 0 ? void 0 : version.name) + ".",
                    documentId: Number(version === null || version === void 0 ? void 0 : version.documentId),
                    userId: userId,
                });
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, prisma.$transaction(updates)];
            case 6:
                _a.sent();
                return [4 /*yield*/, prisma.activity.createMany({ data: activites })];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_5 = _a.sent();
                console.log(error_5);
                feedback.success = false;
                feedback.message = "Failed to delete document";
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/, feedback];
        }
    });
}); };
exports.deleteDocuments = deleteDocuments;
var createNewVersion = function (version, folderId, isDuplicate) {
    if (isDuplicate === void 0) { isDuplicate = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var sameCount, newVersion, latest, documents, _i, documents_1, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.documentVersion.count({
                        where: {
                            name: { startsWith: version.name },
                            folderId: folderId,
                            isCurrent: true,
                        },
                    })];
                case 1:
                    sameCount = _a.sent();
                    if (!isDuplicate) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.documentVersion.create({
                            data: {
                                name: sameCount == 0
                                    ? "" + (version === null || version === void 0 ? void 0 : version.name)
                                    : (version === null || version === void 0 ? void 0 : version.name) + " (Copy " + sameCount + ")",
                                userId: Number(version === null || version === void 0 ? void 0 : version.userId),
                                folderId: folderId,
                                size: version === null || version === void 0 ? void 0 : version.size,
                                isCurrent: true,
                                document: {
                                    create: {
                                        extension: version.document.extension,
                                        mimeType: version.document.mimeType,
                                        isFolder: version.document.isFolder,
                                        url: version.document.url,
                                        userId: version.document.userId,
                                    },
                                },
                            },
                        })];
                case 2:
                    newVersion = _a.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, prisma.documentVersion.update({
                        data: { isCurrent: false },
                        where: { id: version.id },
                    })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.documentVersion.create({
                            data: {
                                name: sameCount == 0
                                    ? "" + version.name
                                    : version.name + " (Copy " + sameCount + ")",
                                userId: Number(version.userId),
                                folderId: folderId,
                                size: version.size,
                                isCurrent: true,
                                documentId: Number(version.documentId),
                            },
                        })];
                case 5:
                    newVersion = _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: newVersion.id },
                        include: { document: true },
                    })];
                case 7:
                    latest = _a.sent();
                    if (!version.document.isFolder) return [3 /*break*/, 12];
                    return [4 /*yield*/, prisma.documentVersion.findMany({
                            where: { folderId: version.document.id },
                            include: { document: true },
                        })];
                case 8:
                    documents = _a.sent();
                    _i = 0, documents_1 = documents;
                    _a.label = 9;
                case 9:
                    if (!(_i < documents_1.length)) return [3 /*break*/, 12];
                    doc = documents_1[_i];
                    // recursive call
                    return [4 /*yield*/, createNewVersion(doc, Number(latest === null || latest === void 0 ? void 0 : latest.document.id), isDuplicate)];
                case 10:
                    // recursive call
                    _a.sent();
                    _a.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 9];
                case 12: return [2 /*return*/];
            }
        });
    });
};
var copyDocuments = function (docIds, folderId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, folder, activities, _i, docIds_1, id, version, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { documentId: folderId, isCurrent: true },
                    })];
            case 2:
                folder = _a.sent();
                activities = [];
                _i = 0, docIds_1 = docIds;
                _a.label = 3;
            case 3:
                if (!(_i < docIds_1.length)) return [3 /*break*/, 7];
                id = docIds_1[_i];
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: id },
                        include: { document: true },
                    })];
            case 4:
                version = _a.sent();
                if (!version) return [3 /*break*/, 6];
                return [4 /*yield*/, createNewVersion(version, folderId)];
            case 5:
                _a.sent();
                activities.push({
                    content: "copied " + version.name + " to " + (folder ? folder.name : "cloudify") + " folder.",
                    userId: userId,
                    documentId: Number(version.documentId),
                });
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, prisma.activity.createMany({ data: activities })];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_6 = _a.sent();
                console.log(error_6);
                feedback.success = false;
                feedback.message = "Failed to copy document(s)";
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/, feedback];
        }
    });
}); };
exports.copyDocuments = copyDocuments;
var moveDocuments = function (docIds, folderId, user) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, activites, _i, docIds_2, id, version, folder, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                activites = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                _i = 0, docIds_2 = docIds;
                _a.label = 2;
            case 2:
                if (!(_i < docIds_2.length)) return [3 /*break*/, 7];
                id = docIds_2[_i];
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: id },
                        include: { document: true },
                    })];
            case 3:
                version = _a.sent();
                if (!version) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { documentId: folderId },
                    })];
            case 4:
                folder = _a.sent();
                return [4 /*yield*/, createNewVersion(version, folderId, false)];
            case 5:
                _a.sent();
                activites.push({
                    content: "moved " + version.name + " to " + (folder ? folder.name : "cloudify") + " folder.",
                    documentId: Number(version === null || version === void 0 ? void 0 : version.documentId),
                    userId: user.id,
                });
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [4 /*yield*/, prisma.activity.createMany({ data: activites })];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_7 = _a.sent();
                console.log(error_7);
                feedback.success = false;
                feedback.message = "Failed to move document(s)";
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/, feedback];
        }
    });
}); };
exports.moveDocuments = moveDocuments;
var renameDocument = function (name, id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, document_1, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.documentVersion.findFirst({ where: { id: id } })];
            case 2:
                document_1 = _a.sent();
                return [4 /*yield*/, prisma.documentVersion.update({ data: { name: name }, where: { id: id } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, prisma.activity.create({
                        data: {
                            content: "Renamed this file from " + (document_1 === null || document_1 === void 0 ? void 0 : document_1.name) + " to " + name,
                            documentId: Number(document_1 === null || document_1 === void 0 ? void 0 : document_1.documentId),
                            userId: userId,
                        },
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                console.log(error_8);
                feedback.success = false;
                feedback.message = "Failed to rename document";
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, feedback];
        }
    });
}); };
exports.renameDocument = renameDocument;
var starDocument = function (star, id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, alreadyStarred, version, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prisma.documentVersion.findFirst({
                        where: { id: id, isStarred: star },
                    })];
            case 2:
                alreadyStarred = _a.sent();
                if (!!alreadyStarred) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.documentVersion.update({
                        data: { isStarred: star },
                        where: { id: id },
                    })];
            case 3:
                version = _a.sent();
                return [4 /*yield*/, prisma.activity.create({
                        data: {
                            content: (star ? "added star to" : "removed star from") + " " + version.name,
                            userId: userId,
                            documentId: version.documentId,
                        },
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_9 = _a.sent();
                console.log(error_9);
                feedback.success = false;
                feedback.message = "Failed to add star to document";
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, feedback];
        }
    });
}); };
exports.starDocument = starDocument;
var getStarredDocuments = function (page, userId, search) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, filter, feedback, totalDocuments, pager, _a, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pageSize = 20;
                filter = {
                    userId: userId,
                    isCurrent: true,
                    isStarred: true,
                };
                feedback = new Feedback_1.default();
                if (search)
                    filter.name = { contains: search };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.documentVersion.count({
                        where: filter,
                    })];
            case 2:
                totalDocuments = _b.sent();
                pager = new Pagination_1.default(page, pageSize).getPager(totalDocuments);
                feedback.page = page;
                feedback.pages = pager.pages;
                _a = feedback;
                return [4 /*yield*/, prisma.documentVersion.findMany({
                        where: filter,
                        take: pageSize,
                        skip: pager.start,
                        include: { document: true },
                        orderBy: {
                            createdAt: "desc",
                        },
                    })];
            case 3:
                _a.results = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_10 = _b.sent();
                console.log(error_10);
                feedback.success = false;
                feedback.message = "Failed to retrieve data";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, feedback];
        }
    });
}); };
exports.getStarredDocuments = getStarredDocuments;
//# sourceMappingURL=document.services.js.map