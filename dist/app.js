"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var Routes_1 = __importDefault(require("./routes/Routes"));
var client_1 = require("@prisma/client");
var deserializeUser_1 = require("./middlewares/deserializeUser");
var refreshExpiredToken_1 = require("./middlewares/refreshExpiredToken");
var express_handlebars_1 = __importDefault(require("express-handlebars"));
dotenv_1.default.config();
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.port = "" + process.env.PORT;
        this.prisma = new client_1.PrismaClient();
        this.settings();
        this.init();
        new Routes_1.default(this.app);
    }
    App.prototype.settings = function () {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            allowedHeaders: "*",
            exposedHeaders: ["X-Access", "X-Refresh"],
        }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.engine("hbs", (0, express_handlebars_1.default)({ defaultLayout: "main", extname: "hbs" }));
        this.app.set("view engine", "hbs");
        this.app.set("views", path_1.default.join(__dirname, "../views"));
        this.app.use(refreshExpiredToken_1.refreshExpiredToken);
        this.app.use(deserializeUser_1.deserializeUser);
    };
    App.prototype.init = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server is listening on port::" + _this.port);
        });
        this.prisma
            .$connect()
            .then(function () { return console.log("connected to db"); })
            .catch(function (reason) { return console.log("failed to connect to db"); });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    };
    return App;
}());
function main() {
    new App();
}
main();
//# sourceMappingURL=app.js.map