"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_controller_1 = __importDefault(require("../controllers/health-controller"));
const router = express_1.default.Router();
router.get("", health_controller_1.default);
exports.default = router;
//# sourceMappingURL=health-route.js.map