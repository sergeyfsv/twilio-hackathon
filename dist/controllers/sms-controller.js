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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const commands_factory_1 = __importDefault(require("../commands/commands-factory"));
const commands_1 = require("../commands/commands");
const bot_command_handler_1 = __importDefault(require("../commands-handlers/bot-command-handler"));
const hw_command_handler_1 = __importDefault(require("../commands-handlers/hw-command-handler"));
const tasksStorage = require("../storage/tasksStorage");
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const msgResponse = new twilio_1.twiml.MessagingResponse();
        const { Body, From, NumMedia, NumSegments, SmsMessageSid, SmsSid, SmsStatus, To } = req.body;
        const context = {
            request: {
                From, NumMedia, NumSegments, SmsMessageSid, SmsSid, SmsStatus, To
            },
            cache: tasksStorage.cache
        };
        if (!Body) {
            res.status(500).end();
            return;
        }
        const command = commands_factory_1.default.create(Body);
        if (command) {
            if (command instanceof commands_1.TaskCommand) {
                const _command = command;
                yield hw_command_handler_1.default(_command, context);
                res.writeHead(200, { "Content-Type": "text/xml" });
                msgResponse.message(`Got the homework for ${_command.subject} on ${_command.date}`);
                return res.end(msgResponse.toString());
            }
            else if (command instanceof commands_1.BotCommand) {
                const result = yield bot_command_handler_1.default(command, context);
                let messageBody = "";
                result.output.generic.forEach(item => {
                    if (item.response_type === "text") {
                        messageBody += item.text;
                    }
                });
                msgResponse.message(messageBody);
            }
        }
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(msgResponse.toString());
    });
}
exports.default = default_1;
;
//# sourceMappingURL=sms-controller.js.map