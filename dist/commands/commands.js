"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskCommand {
    constructor(subject, date, task) {
        this.type = "task";
        this.subject = subject;
        this.date = date;
        this.task = task;
    }
}
exports.TaskCommand = TaskCommand;
class BotCommand {
    constructor(message) {
        this.type = "bot";
        this.message = message;
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=commands.js.map