import { TaskCommand } from "../commands/commands";
import { SMSRequest } from "twilio-typings";
import NodeCache from "node-cache";

export default async (command: TaskCommand, context: {
  request: Partial<SMSRequest>;
  cache: NodeCache;
}) => {
  const taskCacheKey = `${command.subject}:${command.date.toISOString().slice(0, 10)}`;
  context.cache.set(taskCacheKey, command.task);
};