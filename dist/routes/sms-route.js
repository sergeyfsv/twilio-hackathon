"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sms_controller_1 = __importDefault(require("../controllers/sms-controller"));
const async_route_1 = require("./async-route");
const router = express_1.default.Router();
router.post("", async_route_1.asyncRoute(sms_controller_1.default));
exports.default = router;
//# sourceMappingURL=sms-route.js.map