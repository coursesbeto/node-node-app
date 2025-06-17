// las entidades son algo que ya van a llegar a la db

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  private level: LogSeverityLevel;
  private message: string;
  private createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }
}
