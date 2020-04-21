"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const node_cache_1 = __importDefault(require("node-cache"));
const STORAGE_KEY = "storage";
const globalProperties = Object.getOwnPropertyNames(global);
const alreadyExists = (globalProperties.indexOf(STORAGE_KEY) > -1);
if (!alreadyExists) {
    global[STORAGE_KEY] = new node_cache_1.default();
}
;
const singleton = {};
Object.defineProperty(singleton, "cache", {
    get: function () {
        return global[STORAGE_KEY];
    }
});
Object.freeze(singleton);
module.exports = singleton;
//# sourceMappingURL=tasksStorage.js.map