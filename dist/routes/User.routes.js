"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controllers_1 = require("../controllers/user.controllers");
var auth_1 = require("../middlewares/auth");
var uploadDocument_1 = require("../middlewares/uploadDocument");
var uploader = (0, uploadDocument_1.formidableService)();
var UserRoute = /** @class */ (function () {
    function UserRoute(app) {
        this.app = app;
    }
    UserRoute.prototype.register = function () {
        this.app.get("/users/", auth_1.ensureAuthenticated, user_controllers_1.getUsersController);
        this.app.post("/user/", user_controllers_1.createUserController);
        this.app.post("/user/avatar", auth_1.ensureAuthenticated, uploader, user_controllers_1.uploadAvatarController);
        this.app.get("/user/profile", auth_1.ensureAuthenticated, user_controllers_1.getCurrentUser);
        this.app.get("/user/:id/profile", auth_1.ensureAuthenticated, user_controllers_1.getUserController);
        this.app.put("/user/", auth_1.ensureAuthenticated, user_controllers_1.editUserController);
        this.app.delete("/user/", auth_1.ensureAuthenticated, user_controllers_1.deleteUserController);
        this.app.post("/user/login", user_controllers_1.loginController);
        this.app.post("/user/logout", user_controllers_1.logoutController);
        this.app.put("/user/change/password", auth_1.ensureAuthenticated, user_controllers_1.changePasswordController);
    };
    return UserRoute;
}());
exports.default = UserRoute;
//# sourceMappingURL=User.routes.js.map