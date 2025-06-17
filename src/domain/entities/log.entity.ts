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

  getLevel(): LogSeverityLevel {
    return this.level;
  }

  getMessage(): string {
    return this.message;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(date: Date): void {
    this.createdAt = date;
  }

  static parseJSONToLogEntity = (log: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(log);

    const intanceLog = new LogEntity(level, message);

    intanceLog.setCreatedAt(new Date(createdAt));

    return intanceLog;
  };
}
