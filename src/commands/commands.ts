type CommandType = "task" | "bot";

export interface Command {
  readonly type: CommandType;
}

export class TaskCommand implements Command {
  public readonly subject: string;
  public readonly date: Date;
  public readonly task: string;
  public readonly type: CommandType;
  constructor(subject: string, date: Date, task: string) {
    this.type = "task";
    this.subject = subject;
    this.date = date;
    this.task = task;
  }
}

export class BotCommand implements Command {
  public readonly message: string;
  public readonly type: CommandType;
  constructor(message: string) {
    this.type = "bot";
    this.message = message;
  }
}