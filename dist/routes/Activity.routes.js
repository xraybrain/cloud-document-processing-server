"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../middlewares/auth");
var activity_controller_1 = require("../controllers/activity.controller");
var ActivityRoute = /** @class */ (function () {
    function ActivityRoute(app) {
        this.app = app;
    }
    ActivityRoute.prototype.register = function () {
        this.app.get("/document/activities/", auth_1.ensureAuthenticated, activity_controller_1.getActivitiesController);
    };
    return ActivityRoute;
}());
exports.default = ActivityRoute;
//# sourceMappingURL=Activity.routes.js.map