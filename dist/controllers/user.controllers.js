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
exports.logoutController = exports.loginController = exports.deleteUserController = exports.changePasswordController = exports.editUserController = exports.getCurrentUser = exports.getUserController = exports.getUsersController = exports.uploadAvatarController = exports.createUserController = void 0;
var bcryptjs_1 = require("bcryptjs");
var UserSchema_validator_1 = require("../models/schemas/validators/UserSchema.validator");
var validator_utils_1 = require("../utils/validator.utils");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var user_services_1 = require("../services/user.services");
var token_services_1 = require("../services/token.services");
var jwt_utils_1 = require("../utils/jwt.utils");
var createUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, formData, validated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                formData = req.body;
                return [4 /*yield*/, (0, validator_utils_1.validator)(UserSchema_validator_1.CreateUserSchema, formData)];
            case 1:
                validated = _a.sent();
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_services_1.createUser)(formData)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.message = validated.errors.join("<br/>");
                feedback.success = false;
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.createUserController = createUserController;
var uploadAvatarController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadFeedback, feedback, user, upload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uploadFeedback = req.body;
                feedback = new Feedback_1.default();
                user = req.user;
                feedback.message = uploadFeedback.message;
                if (!uploadFeedback.success) return [3 /*break*/, 2];
                upload = uploadFeedback.results[0];
                return [4 /*yield*/, (0, user_services_1.editUser)({ image: upload.url, id: user === null || user === void 0 ? void 0 : user.id })];
            case 1:
                feedback = _a.sent();
                if (feedback.success) {
                    feedback.result = upload.url;
                }
                _a.label = 2;
            case 2:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.uploadAvatarController = uploadAvatarController;
var getUsersController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, search, userid, feedback;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, page = _a.page, search = _a.search, userid = _a.userid;
                return [4 /*yield*/, (0, user_services_1.getUsers)(Number(page || 1), "" + search, Number(userid))];
            case 1:
                feedback = _b.sent();
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsersController = getUsersController;
var getUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, user_services_1.getUser)({ id: Number(id) })];
            case 1:
                user = _a.sent();
                res.send(user);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserController = getUserController;
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send(req.user);
        return [2 /*return*/];
    });
}); };
exports.getCurrentUser = getCurrentUser;
var editUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, formData, validated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                formData = req.body;
                return [4 /*yield*/, (0, validator_utils_1.validator)(UserSchema_validator_1.UpdateUserSchema, formData)];
            case 1:
                validated = _a.sent();
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_services_1.editUser)(formData)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.message = validated.errors.join("<br/>");
                feedback.success = false;
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.editUserController = editUserController;
var changePasswordController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, feedback, formData, validated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                feedback = new Feedback_1.default();
                formData = req.body;
                formData.id = user === null || user === void 0 ? void 0 : user.id;
                return [4 /*yield*/, (0, validator_utils_1.validator)(UserSchema_validator_1.UpdateUserPasswordSchema, formData)];
            case 1:
                validated = _a.sent();
                if (!validated.isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_services_1.editPassword)(formData)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                feedback.message = validated.errors.join("<br/>");
                feedback.success = false;
                _a.label = 4;
            case 4:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.changePasswordController = changePasswordController;
var deleteUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, id, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.body.id;
                return [4 /*yield*/, (0, user_services_1.deleteUser)(id)];
            case 2:
                feedback = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                feedback.message = "Failed to process request";
                feedback.success = false;
                return [3 /*break*/, 4];
            case 4:
                res.json(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUserController = deleteUserController;
var loginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, feedback, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                feedback = new Feedback_1.default();
                console.log(req.body);
                if (!email || !password) {
                    feedback.message = "Both email and password are required";
                    feedback.success = false;
                    return [2 /*return*/, res.send(feedback)];
                }
                return [4 /*yield*/, (0, user_services_1.getUser)({ email: "" + email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    feedback.message = "Wrong email or password combination";
                    feedback.success = false;
                    return [2 /*return*/, res.send(feedback)];
                }
                if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
                    feedback.message = "Wrong email or password combination";
                    feedback.success = false;
                    return [2 /*return*/, res.send(feedback)];
                }
                return [4 /*yield*/, (0, token_services_1.createAccessToken)(user, "" + req.headers["user-agent"])];
            case 2:
                token = _b.sent();
                feedback.message = "success";
                res.setHeader("X-Access", "Bearer " + token);
                res.setHeader("access-control-expose-headers", "x-access");
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.loginController = loginController;
var logoutController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feedback, authorization, decoded, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feedback = new Feedback_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                authorization = "" + (req.headers["authorization"] || req.query["authorization"]);
                if (!authorization) return [3 /*break*/, 6];
                authorization = authorization.split(" ")[1];
                return [4 /*yield*/, (0, jwt_utils_1.decodeToken)(authorization)];
            case 2:
                decoded = _a.sent();
                if (!decoded) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, token_services_1.updateRefreshToken)(decoded.token, { valid: false })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                feedback.success = false;
                feedback.message = "Invalid token";
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                feedback.success = false;
                feedback.message = "Token is required";
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.log(error_2);
                feedback.success = false;
                feedback.message = "Failed to logout";
                return [3 /*break*/, 9];
            case 9:
                res.send(feedback);
                return [2 /*return*/];
        }
    });
}); };
exports.logoutController = logoutController;
//# sourceMappingURL=user.controllers.js.map