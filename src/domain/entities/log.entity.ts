// las entidades son algo que ya van a llegar a la db

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface ConstructorOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
}

export class LogEntity {
  private level: LogSeverityLevel;
  private message: string;
  private createdAt: Date;
  private origin: string;

  constructor( { level, message, origin } : ConstructorOptions) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
    this.origin = origin;
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

  getOrigin(): string {
    return this.origin;
  }

  setOrigin(origin: string): void {
    this.origin = origin;
  }

  static parseJSONToLogEntity = (log: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(log);

    const intanceLog = new LogEntity({level, message, origin});

    intanceLog.setCreatedAt(new Date(createdAt));

    return intanceLog;
  };
}
