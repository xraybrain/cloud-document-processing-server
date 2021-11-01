"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uploadDocument_1 = require("../middlewares/uploadDocument");
var uploader = (0, uploadDocument_1.formidableService)();
var auth_1 = require("../middlewares/auth");
var document_controllers_1 = require("../controllers/document.controllers");
var DocumentRoute = /** @class */ (function () {
    function DocumentRoute(app) {
        this.app = app;
    }
    DocumentRoute.prototype.register = function () {
        this.app.post("/document/upload/", auth_1.ensureAuthenticated, uploader, document_controllers_1.createDocumentController);
        this.app.post("/document/folder/", auth_1.ensureAuthenticated, document_controllers_1.createFolderController);
        this.app.get("/documents/", auth_1.ensureAuthenticated, document_controllers_1.getDocumentsController);
        this.app.get("/document/", auth_1.ensureAuthenticated, document_controllers_1.getDocumentController);
        this.app.delete("/documents/", auth_1.ensureAuthenticated, document_controllers_1.deleteDocumentsController);
        this.app.post("/documents/copy/", auth_1.ensureAuthenticated, document_controllers_1.copyDocumentsController);
        this.app.post("/documents/move/", auth_1.ensureAuthenticated, document_controllers_1.moveDocumentsController);
        this.app.post("/document/rename", auth_1.ensureAuthenticated, document_controllers_1.renameDocumentController);
        this.app.post("/document/star", auth_1.ensureAuthenticated, document_controllers_1.starDocumentController);
        this.app.get("/documents/star", auth_1.ensureAuthenticated, document_controllers_1.getStarredDocumentsController);
    };
    return DocumentRoute;
}());
exports.default = DocumentRoute;
//# sourceMappingURL=Document.routes.js.map