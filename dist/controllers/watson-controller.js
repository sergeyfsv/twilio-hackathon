"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasksStorage = require("../storage/tasksStorage");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { subject, date } = req.body;
    const taskCacheKey = `${subject}:${date}`;
    if ((_a = tasksStorage.cache) === null || _a === void 0 ? void 0 : _a.has(taskCacheKey)) {
        res.status(200).json({
            message: tasksStorage.cache.get(taskCacheKey)
        });
    }
    else {
        res.status(200).json({
            message: `Cannot find a homework for ${subject} on ${date}. Please reach your teacher directly.`
        });
    }
});
//# sourceMappingURL=watson-controller.js.map