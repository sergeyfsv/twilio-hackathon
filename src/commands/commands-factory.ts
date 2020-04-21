import {Command, TaskCommand, BotCommand} from "./commands";
import * as chrono from "chrono-node";

enum BOT_COMMANDS {
  HOMEWORK = 'hw',
  BOT = 'bot'
};

export default class CommandsFactory {
  static create(body: string) : Command | undefined {
    const isHomework = body.startsWith(`@${BOT_COMMANDS.HOMEWORK}`);
    const isBot = body.startsWith(`@${BOT_COMMANDS.BOT}`);
    if (isHomework) {
      const message: string = body.slice(BOT_COMMANDS.HOMEWORK.length+1).trim();
      const tags = message.split(/\s+/g);
      if (tags.length > 1) {
        const subject = tags[0];
        const date = chrono.parseDate(tags[1]);
        return new TaskCommand(subject, date, tags.slice(2).join(' '));
      }
    } else if (isBot) {
      const message: string = body.slice(BOT_COMMANDS.BOT.length+1).trim();
      return new BotCommand(message)
    }
  }
}
