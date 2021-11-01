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
exports.decryptSharerTokenController = exports.deleteShareController = exports.shareDocumentController = exports.generateShareLinkController = exports.getSharedWithMembersController = exports.getSharedDocumentsController = void 0;
var Feedback_1 = __importDefault(require("../models/Feedback"));
var ShareDocumentShema_validator_1 = require("../models/schemas/validators/ShareDocumentShema.validator");
var share_services_1 = require("../services/share.services");
var jwt_utils_1 = require("../utils/jwt.utils");
var validator_utils_1 = require("../utils/validator.utils");
var getSharedDocumentsController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, feedback, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                feedback = new Feedback_1.default();
                page = req.query.page;
                return [4 /*yield*/, (0, share_services_1.getSharedDocuments)(Number(page || 1), user)];
            case 1:
                feedback = _a.sent();
                res.json(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getSharedDocumentsController = getSharedDocumentsController;
var getSharedWithMembersController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, doc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                doc = req.query.doc;
                return [4 /*yield*/, (0, share_services_1.getSharedWithMembers)("" + doc)];
            case 1:
                feedback = _a.sent();
                res.json(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getSharedWithMembersController = getSharedWithMembersController;
var generateShareLinkController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, docId, feedback;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                docId = req.body.docId;
                feedback = new Feedback_1.default();
                if (!docId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, share_services_1.generateShareLink)(docId, user)];
            case 1:
                feedback = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                feedback.success = false;
                feedback.message =
                    "Failed to generate link because the document id is missing";
                _a.label = 3;
            case 3:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.generateShareLinkController = generateShareLinkController;
var shareDocumentController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, validated, feedback, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                return [4 /*yield*/, (0, validator_utils_1.validator)(ShareDocumentShema_validator_1.ShareDocumentSchema, formData)];
            case 1:
                validated = _a.sent();
                feedback = new Feedback_1.default();
                user = req.user;
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, share_services_1.shareDocument)(formData.docId, formData.user, user)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.success = false;
                feedback.message = validated.errors.join(",");
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.shareDocumentController = shareDocumentController;
var deleteShareController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, docId, user, feedback;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, docId = _a.docId, user = _a.user;
                return [4 /*yield*/, (0, share_services_1.deleteShare)(docId, user)];
            case 1:
                feedback = _b.sent();
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteShareController = deleteShareController;
var decryptSharerTokenController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, redirectUrl, verified, doc;
    return __generator(this, function (_a) {
        token = req.query.token;
        redirectUrl = req.hostname + "://" + req.baseUrl;
        if (process.env.NODE_ENV === "production") {
            redirectUrl = "/preview/";
        }
        else {
            redirectUrl = "http://localhost:4200/preview/";
        }
        if (token) {
            verified = (0, jwt_utils_1.verifyToken)(token);
            if (!verified.expired) {
                doc = verified.decoded.doc;
                res.redirect("" + redirectUrl + doc);
            }
            else {
                res.render("sharer", { message: "Failed to verify token" });
            }
        }
        else {
            res.render("sharer", { message: "This link is broken" });
        }
        return [2 /*return*/];
    });
}); };
exports.decryptSharerTokenController = decryptSharerTokenController;
//# sourceMappingURL=share.controller.js.map