"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uploadDocument_1 = require("../middlewares/uploadDocument");
var uploader = (0, uploadDocument_1.formidableService)();
var auth_1 = require("../middlewares/auth");
var comment_controller_1 = require("../controllers/comment.controller");
var CommentRoute = /** @class */ (function () {
    function CommentRoute(app) {
        this.app = app;
    }
    CommentRoute.prototype.register = function () {
        this.app.post('/document/comment/', auth_1.ensureAuthenticated, comment_controller_1.createCommentController);
        this.app.get('/document/comments/', auth_1.ensureAuthenticated, comment_controller_1.getCommentsController);
        this.app.put('/document/comment/', auth_1.ensureAuthenticated, comment_controller_1.editCommentController);
        this.app.delete('/document/comment', auth_1.ensureAuthenticated, comment_controller_1.deleteCommentController);
    };
    return CommentRoute;
}());
exports.default = CommentRoute;
//# sourceMappingURL=Comment.routes.js.map