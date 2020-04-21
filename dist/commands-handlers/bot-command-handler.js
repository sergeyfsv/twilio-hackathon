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
const v2_1 = __importDefault(require("ibm-watson/assistant/v2"));
const auth_1 = require("ibm-watson/auth");
const logger_1 = __importDefault(require("./../helpers/logger"));
const logger = logger_1.default.getLogger("bot-command");
const ASSISTANT_ID = "0f52a845-56b7-46ed-b372-7e1912f934bf";
;
function instanceOfAssistantException(object) {
    if (object && typeof object === "object") {
        return ("status" in object && "message" in object);
    }
    return false;
}
const watsonCredentials = global.cloudEnv.getDictionary("watson");
logger.debug(watsonCredentials.apikey);
const assistant = new v2_1.default({
    version: "2020-04-01",
    authenticator: new auth_1.IamAuthenticator({
        apikey: watsonCredentials.apikey
    }),
    url: watsonCredentials.url
});
function createAndCacheSession(cacheKey, cache) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield assistant.createSession({
            assistantId: ASSISTANT_ID
        });
        const result = session.result.session_id;
        cache.set(cacheKey, result);
        return result;
    });
}
function sendMessgeToAssistant(sessionId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield assistant.message({
            assistantId: ASSISTANT_ID,
            sessionId: sessionId,
            input: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                message_type: "text",
                text: message
            }
        });
    });
}
exports.default = (command, context) => __awaiter(void 0, void 0, void 0, function* () {
    const botCommandCacheKey = `session:${context.request.From}`;
    let assistantSessionId;
    if (context.cache.has(botCommandCacheKey)) {
        assistantSessionId = context.cache.get(botCommandCacheKey);
        logger.debug(`Got the cached sessionId: ${botCommandCacheKey} - ${assistantSessionId}`);
    }
    else {
        assistantSessionId = yield createAndCacheSession(botCommandCacheKey, context.cache);
        logger.debug(`Created the new session: ${botCommandCacheKey} - ${assistantSessionId}`);
    }
    try {
        const response = yield sendMessgeToAssistant(assistantSessionId, command.message);
        logger.debug(`Sent message to assistant. session: ${assistantSessionId}, message: ${command.message}`);
        return response.result;
    }
    catch (ex) {
        logger.error(ex);
        if (!instanceOfAssistantException(ex)) {
            throw ex;
        }
        logger.warn(`AssistantException: ${ex.message}`);
        const exception = ex;
        if ((exception.status === 404) && (exception === null || exception === void 0 ? void 0 : exception.message.startsWith("Invalid Session"))) {
            assistantSessionId = yield createAndCacheSession(botCommandCacheKey, context.cache);
            logger.debug(`Recreated the sessionId: ${botCommandCacheKey} - ${assistantSessionId}`);
            const response = yield sendMessgeToAssistant(assistantSessionId, command.message);
            logger.debug(`Resent message to assistant. session: ${assistantSessionId}, message: ${command.message}`);
            return response.result;
        }
    }
});
/*
{
  "output": {
    "generic": [
      {
        "response_type": "text",
        "text": "Hello! What can I do for you?"
      }
    ],
    "intents": [
      {
        "intent": "hello",
        "confidence": 1
      }
    ],
    "entities": []
  }
}
*/
//# sourceMappingURL=bot-command-handler.js.map