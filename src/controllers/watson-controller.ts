import {Request, Response} from "express";

import tasksStorage = require("../storage/tasksStorage");

export default async (req: Request, res: Response) => {
  const {subject, date} = req.body;
  const taskCacheKey = `${subject}:${date}`;
  if (tasksStorage.cache?.has(taskCacheKey)) {
    res.status(200).json({
      message: tasksStorage.cache.get(taskCacheKey)
    });
  } else {
    res.status(200).json({
      message: `Cannot find a homework for ${subject} on ${date}. Please reach your teacher directly.`
    });
  }
};