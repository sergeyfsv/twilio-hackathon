"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./helpers/logger"));
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen(app_1.default.get("port"), app_1.default.get("host"), function () {
    const { address, port } = this.address();
    logger_1.default.getLogger().info(`App is running at http://${address}:${port} in ${app_1.default.get("env")} mode`);
});
exports.default = server;
//# sourceMappingURL=server.js.map