"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Activity_routes_1 = __importDefault(require("./Activity.routes"));
var Comment_routes_1 = __importDefault(require("./Comment.routes"));
var Document_routes_1 = __importDefault(require("./Document.routes"));
var Share_routes_1 = __importDefault(require("./Share.routes"));
var User_routes_1 = __importDefault(require("./User.routes"));
var Route = /** @class */ (function () {
    function Route(app) {
        this.app = app;
        this.routes();
    }
    Route.prototype.routes = function () {
        new User_routes_1.default(this.app).register();
        new Document_routes_1.default(this.app).register();
        new Comment_routes_1.default(this.app).register();
        new Share_routes_1.default(this.app).register();
        new Activity_routes_1.default(this.app).register();
    };
    return Route;
}());
exports.default = Route;
//# sourceMappingURL=Routes.js.map