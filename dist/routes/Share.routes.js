"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../middlewares/auth");
var share_controller_1 = require("../controllers/share.controller");
var ShareDocumentRoute = /** @class */ (function () {
    function ShareDocumentRoute(app) {
        this.app = app;
    }
    ShareDocumentRoute.prototype.register = function () {
        this.app.post("/share/generate/link/", auth_1.ensureAuthenticated, share_controller_1.generateShareLinkController);
        this.app.get("/shared/documents/", auth_1.ensureAuthenticated, share_controller_1.getSharedDocumentsController);
        this.app.get("/shared/members/", auth_1.ensureAuthenticated, share_controller_1.getSharedWithMembersController);
        this.app.post("/share/document/", share_controller_1.shareDocumentController);
        this.app.get("/sharer/", share_controller_1.decryptSharerTokenController);
        this.app.delete("/shared/document", share_controller_1.deleteShareController);
    };
    return ShareDocumentRoute;
}());
exports.default = ShareDocumentRoute;
//# sourceMappingURL=Share.routes.js.map