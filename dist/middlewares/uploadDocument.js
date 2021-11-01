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
exports.formidableService = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var formidable_1 = require("formidable");
var Feedback_1 = __importDefault(require("../models/Feedback"));
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
});
var MAX_FILE_SIZE = 50000000; // 50mb
var defaultUploadDir = "../../public/uploads";
var getExtension = function (document) { var _a, _b; return (_a = document.name) === null || _a === void 0 ? void 0 : _a.substring((_b = document.name) === null || _b === void 0 ? void 0 : _b.lastIndexOf(".")); };
var exceedMaxFileSize = function (size) { return size > MAX_FILE_SIZE; };
var formidableService = function (uploadDir) { return function (req, res, next) {
    var uploadTo = uploadDir || defaultUploadDir;
    var form = new formidable_1.IncomingForm();
    var feedback = new Feedback_1.default();
    feedback.message = "";
    feedback.results = [];
    var canUpload = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log("Form Parse Error: ", err);
            feedback.success = false;
            feedback.message = "Failed to process upload.";
            canUpload = false;
        }
        if (files.upload !== undefined) {
            var uploadFiles = void 0;
            if (files.upload instanceof Array) {
                uploadFiles = files.upload;
            }
            else {
                uploadFiles = [files.upload];
            }
            // Loop through upload files
            uploadFiles.forEach(function (file, index) { return __awaiter(void 0, void 0, void 0, function () {
                var tempPath, document, c, error_1, fileName, data, newUploadDir;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            tempPath = file.path;
                            document = {
                                size: file.size,
                                name: "" + file.name,
                                type: "" + file.type,
                                extension: path_1.default.extname(file.name).replace(".", ""),
                                url: "",
                            };
                            if (exceedMaxFileSize(file.size)) {
                                canUpload = false;
                                feedback.message = "filesize must between " + MAX_FILE_SIZE / (1000 * 1000) + " mb";
                                feedback.success = false;
                            }
                            if (!canUpload) return [3 /*break*/, 6];
                            feedback.formData = fields;
                            if (!(process.env.NODE_ENV === "production")) return [3 /*break*/, 5];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, cloudinary_1.v2.uploader.upload(tempPath)];
                        case 2:
                            c = _c.sent();
                            document.url = c.secure_url;
                            feedback.message += file.name + " uploaded successfully.";
                            (_a = feedback.results) === null || _a === void 0 ? void 0 : _a.push(document);
                            console.log(document);
                            console.log(feedback);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            feedback.message += "An error occured while uploading " + file.name + ".";
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            try {
                                fileName = "" + Date.now() + path_1.default.extname(file.name);
                                data = fs_1.default.readFileSync(tempPath);
                                newUploadDir = path_1.default.resolve(__dirname, uploadTo, fileName);
                                fs_1.default.writeFileSync(newUploadDir, data);
                                feedback.message += file.name + " uploaded successfully";
                                document.url = "/" + uploadTo.replace(/(\.\.\/)+?(public\/)?/g, "") + "/" + fileName;
                                (_b = feedback.results) === null || _b === void 0 ? void 0 : _b.push(document);
                            }
                            catch (error) {
                                feedback.message += "An error occured while uploading " + file.name + ".";
                                console.log(error);
                            }
                            _c.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            req.body = feedback;
            next();
        }
        else {
            feedback.success = false;
            feedback.message = "Missing 'upload' field";
            req.body = feedback;
            next();
        }
    });
}; };
exports.formidableService = formidableService;
//# sourceMappingURL=uploadDocument.js.map