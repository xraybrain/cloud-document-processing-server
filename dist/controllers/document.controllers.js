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
exports.getStarredDocumentsController = exports.starDocumentController = exports.renameDocumentController = exports.deleteDocumentsController = exports.moveDocumentsController = exports.copyDocumentsController = exports.getDocumentController = exports.getDocumentsController = exports.createFolderController = exports.createDocumentController = void 0;
var Feedback_1 = __importDefault(require("../models/Feedback"));
var DocumentSchema_validator_1 = require("../models/schemas/validators/DocumentSchema.validator");
var document_services_1 = require("../services/document.services");
var validator_utils_1 = require("../utils/validator.utils");
var createDocumentController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadFeedback, feedback, folder, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uploadFeedback = req.body;
                feedback = new Feedback_1.default();
                feedback.message = uploadFeedback.message;
                folder = (uploadFeedback.formData || {}).folder;
                user = req.user;
                console.log(uploadFeedback);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!uploadFeedback.results) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, document_services_1.createDocuments)(uploadFeedback.results, Number(user === null || user === void 0 ? void 0 : user.id), folder ? Number(folder) : null)];
            case 2:
                // save
                feedback = _a.sent();
                _a.label = 3;
            case 3:
                if (!uploadFeedback.success) {
                    feedback.success = false;
                    feedback.message = uploadFeedback.message;
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                feedback.success = false;
                feedback.message = "Failed to process request";
                return [3 /*break*/, 5];
            case 5:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.createDocumentController = createDocumentController;
var createFolderController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, user, feedback, validated, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                user = req.user;
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, validator_utils_1.validator)(DocumentSchema_validator_1.CreateFolderSchema, formData)];
            case 2:
                validated = _a.sent();
                if (!validated.isValid) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, document_services_1.createFolder)(formData, Number(user === null || user === void 0 ? void 0 : user.id))];
            case 3:
                // save
                feedback = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                feedback.success = false;
                feedback.message = validated.errors.join("<br>");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.log(error_2);
                feedback.success = false;
                feedback.message = "Failed to process request";
                return [3 /*break*/, 7];
            case 7:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.createFolderController = createFolderController;
var getDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, folder, page, search, star, isfolder, user, feedback;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, folder = _a.folder, page = _a.page, search = _a.search, star = _a.star, isfolder = _a.isfolder;
                user = req.user;
                return [4 /*yield*/, (0, document_services_1.getDocuments)(page ? Number(page) : 1, Number(user === null || user === void 0 ? void 0 : user.id), folder ? Number(folder) : undefined, "" + star === "true", search ? "" + search : "", "" + isfolder === "true")];
            case 1:
                feedback = _b.sent();
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getDocumentsController = getDocumentsController;
var getDocumentController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, feedback;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                return [4 /*yield*/, (0, document_services_1.getDocument)("" + id)];
            case 1:
                feedback = _a.sent();
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getDocumentController = getDocumentController;
var copyDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, feedback, user, validated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                formData.folderId = formData.folderId || 0;
                feedback = new Feedback_1.default();
                user = req.user;
                return [4 /*yield*/, (0, validator_utils_1.validator)(DocumentSchema_validator_1.UpdateDocumentsSchema, formData)];
            case 1:
                validated = _a.sent();
                formData.folderId = formData.folderId === 0 ? undefined : formData.folderId;
                console.log(formData);
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, document_services_1.copyDocuments)(formData.docsId, formData.folderId, Number(user === null || user === void 0 ? void 0 : user.id))];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.success = false;
                feedback.message = validated.errors.join("<br>");
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.copyDocumentsController = copyDocumentsController;
var moveDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, feedback, validated, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                formData.folderId = formData.folderId || 0;
                feedback = new Feedback_1.default();
                return [4 /*yield*/, (0, validator_utils_1.validator)(DocumentSchema_validator_1.UpdateDocumentsSchema, formData)];
            case 1:
                validated = _a.sent();
                user = req.user;
                formData.folderId = formData.folderId === 0 ? undefined : formData.folderId;
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, document_services_1.moveDocuments)(formData.docsId, formData.folderId, user)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.success = false;
                feedback.message = validated.errors.join("<br>");
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.moveDocumentsController = moveDocumentsController;
var deleteDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, feedback, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                feedback = new Feedback_1.default();
                user = req.user;
                if (!formData.ids) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, document_services_1.deleteDocuments)(formData.ids, Number(user === null || user === void 0 ? void 0 : user.id))];
            case 1:
                feedback = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                feedback.success = false;
                feedback.message = "ids is required";
                _a.label = 3;
            case 3:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteDocumentsController = deleteDocumentsController;
var renameDocumentController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, feedback, validated, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                feedback = new Feedback_1.default();
                return [4 /*yield*/, (0, validator_utils_1.validator)(DocumentSchema_validator_1.RenameDocumentsSchema, formData)];
            case 1:
                validated = _a.sent();
                user = req.user;
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, document_services_1.renameDocument)(formData.name, formData.id, Number(user === null || user === void 0 ? void 0 : user.id))];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.success = false;
                feedback.message = validated.errors.join("<br>");
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.renameDocumentController = renameDocumentController;
var starDocumentController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, feedback, validated, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                feedback = new Feedback_1.default();
                return [4 /*yield*/, (0, validator_utils_1.validator)(DocumentSchema_validator_1.StarDocumentsSchema, formData)];
            case 1:
                validated = _a.sent();
                user = req.user;
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, document_services_1.starDocument)(formData.star, formData.docId, Number(user === null || user === void 0 ? void 0 : user.id))];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.success = false;
                feedback.message = validated.errors.join("<br>");
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.starDocumentController = starDocumentController;
var getStarredDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, search, user, feedback;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, page = _a.page, search = _a.search;
                user = req.user;
                return [4 /*yield*/, (0, document_services_1.getStarredDocuments)(page ? Number(page) : 1, Number(user === null || user === void 0 ? void 0 : user.id), search ? "" + search : "")];
            case 1:
                feedback = _b.sent();
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getStarredDocumentsController = getStarredDocumentsController;
//# sourceMappingURL=document.controllers.js.map