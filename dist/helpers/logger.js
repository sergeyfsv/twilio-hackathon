"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        errors: { type: "stderr" },
        out: { type: "stdout" },
        errorsFilter: { type: "logLevelFilter", appender: "errors", level: "error" }
    },
    categories: {
        default: {
            appenders: ["out", "errorsFilter"], level: "debug"
        }
    }
});
exports.default = log4js_1.default;
//# sourceMappingURL=logger.js.map