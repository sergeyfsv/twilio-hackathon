import { BotCommand } from "../commands/commands";
import { SMSRequest } from "twilio-typings";
import NodeCache from "node-cache";

import AssistantV2 from "ibm-watson/assistant/v2";
import {IamAuthenticator} from "ibm-watson/auth";
import { ServiceCredentials } from "ibm-cloud-env";

import log4js from  "./../helpers/logger";
const logger = log4js.getLogger("bot-command");

const ASSISTANT_ID = "0f52a845-56b7-46ed-b372-7e1912f934bf";

interface AssistantException {
  status: number;
  message?: string;
};

function instanceOfAssistantException(object: unknown): object is AssistantException {
  if (object && typeof object === "object") {
    return ("status" in object && "message" in object);
  }
  return false;
}

const watsonCredentials: ServiceCredentials = (global as NodeJS.Global).cloudEnv.getDictionary("watson");
logger.debug(watsonCredentials.apikey);

const assistant = new AssistantV2({
  version: "2020-04-01",
  authenticator: new IamAuthenticator({
    apikey: watsonCredentials.apikey
  }),
  url: watsonCredentials.url
});

async function createAndCacheSession(cacheKey: string, cache: NodeCache):Promise<string> {
  const session = await assistant.createSession({
    assistantId: ASSISTANT_ID
  });
  const result = session.result.session_id;
  cache.set(cacheKey, result);
  return result;
}

async function sendMessgeToAssistant(sessionId: string, message: string): Promise<AssistantV2.Response<AssistantV2.MessageResponse>> {
  return await assistant.message({
    assistantId: ASSISTANT_ID,
    sessionId: sessionId,
    input: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      message_type: "text",
      text: message
    }
  });
}

export default async (command: BotCommand, context: {request: Partial<SMSRequest>; cache: NodeCache}): Promise<AssistantV2.MessageResponse> => {
  const botCommandCacheKey = `session:${context.request.From}`;
  let assistantSessionId: string;
  if (context.cache.has(botCommandCacheKey)) {
    assistantSessionId = context.cache.get(botCommandCacheKey) as string;
    logger.debug(`Got the cached sessionId: ${botCommandCacheKey} - ${assistantSessionId}`);
  } else {
    assistantSessionId = await createAndCacheSession(botCommandCacheKey, context.cache);
    logger.debug(`Created the new session: ${botCommandCacheKey} - ${assistantSessionId}`);
  }
  try {
    const response = await sendMessgeToAssistant(assistantSessionId, command.message);
    logger.debug(`Sent message to assistant. session: ${assistantSessionId}, message: ${command.message}`);
    return response.result;
  }
  catch(ex) {
    logger.error(ex);
    if (!instanceOfAssistantException(ex)) {
      throw ex;
    }
    logger.warn(`AssistantException: ${ex.message}`);
    const exception: AssistantException = ex as AssistantException;
    if ((exception.status === 404) && (exception?.message.startsWith("Invalid Session"))) {
      assistantSessionId = await createAndCacheSession(botCommandCacheKey, context.cache);
      logger.debug(`Recreated the sessionId: ${botCommandCacheKey} - ${assistantSessionId}`);
      const response = await sendMessgeToAssistant(assistantSessionId, command.message);
      logger.debug(`Resent message to assistant. session: ${assistantSessionId}, message: ${command.message}`);
      return response.result;
    }
  }
};
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
