"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const IBMCloudEnv = require("ibm-cloud-env");
global.cloudEnv = IBMCloudEnv;
global.cloudEnv.init("/credentials/mapping.json");
const health_route_1 = __importDefault(require("./routes/health-route"));
const swagger_route_1 = __importDefault(require("./routes/swagger-route"));
const sms_route_1 = __importDefault(require("./routes/sms-route"));
const watson_route_1 = __importDefault(require("./routes/watson-route"));
const app = express_1.default();
app.set("host", process.env.HOST || "127.0.0.1");
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use("/health", health_route_1.default);
app.use("/swagger", swagger_route_1.default);
app.use("/sms", sms_route_1.default);
app.use("/watson", watson_route_1.default);
app.all("", (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../public", "index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map