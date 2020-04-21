import {Request, Response} from "express";
import { twiml } from "twilio";
import * as twilioTypes from "twilio-typings";
import CommandsFactory from "../commands/commands-factory";
import { Command, TaskCommand, BotCommand } from "../commands/commands";
import BotCommandHandler from "../commands-handlers/bot-command-handler";
import HwCommandHandler from "../commands-handlers/hw-command-handler";

import tasksStorage = require("../storage/tasksStorage");

export default async function(req: Request, res: Response) {
  const msgResponse = new twiml.MessagingResponse();
  const { Body, From, NumMedia, NumSegments, SmsMessageSid, SmsSid, SmsStatus, To }:
  Partial<twilioTypes.SMSRequest> = req.body;
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

  const command: Command | undefined = CommandsFactory.create(Body);
  if (command) {
    if (command instanceof TaskCommand) {
      const _command = command as TaskCommand;
      await HwCommandHandler(_command, context);
      res.writeHead(200, {"Content-Type": "text/xml"});
      msgResponse.message(`Got the homework for ${_command.subject} on ${_command.date}`);
      return res.end(msgResponse.toString());
    } else if (command instanceof BotCommand) {
      const result = await BotCommandHandler(command as BotCommand, context);
      let messageBody = "";
      result.output.generic.forEach(item => {
        if (item.response_type === "text") {
          messageBody += item.text;
        }
      });
      msgResponse.message(messageBody);
    }
  }

  res.writeHead(200, {"Content-Type": "text/xml"});
  res.end(msgResponse.toString());
};