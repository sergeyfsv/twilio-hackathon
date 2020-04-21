"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const chrono = __importStar(require("chrono-node"));
var BOT_COMMANDS;
(function (BOT_COMMANDS) {
    BOT_COMMANDS["HOMEWORK"] = "hw";
    BOT_COMMANDS["BOT"] = "bot";
})(BOT_COMMANDS || (BOT_COMMANDS = {}));
;
class CommandsFactory {
    static create(body) {
        const isHomework = body.startsWith(`@${BOT_COMMANDS.HOMEWORK}`);
        const isBot = body.startsWith(`@${BOT_COMMANDS.BOT}`);
        if (isHomework) {
            const message = body.slice(BOT_COMMANDS.HOMEWORK.length + 1).trim();
            const tags = message.split(/\s+/g);
            if (tags.length > 1) {
                const subject = tags[0];
                const date = chrono.parseDate(tags[1]);
                return new commands_1.TaskCommand(subject, date, tags.slice(2).join(' '));
            }
        }
        else if (isBot) {
            const message = body.slice(BOT_COMMANDS.BOT.length + 1).trim();
            return new commands_1.BotCommand(message);
        }
    }
}
exports.default = CommandsFactory;
//# sourceMappingURL=commands-factory.js.map