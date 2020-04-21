"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncRoute = (route) => ((req, res, next) => (Promise.resolve(route(req, res, next)).catch(next)));
//# sourceMappingURL=async-route.js.map