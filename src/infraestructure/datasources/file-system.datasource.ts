import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  // rutas para logs
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = "logs/logs-all.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  // funcion para verificar la existencia del directorio de logs
  private createLogsFiles = (): void => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    // array con todos los paths, si no existen, lo creamos
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  // funcionalidad para guardar un log, en all y en su respectivo log de acuerdo al nivel de severidad
  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJSON: string = `${JSON.stringify(newLog)}\n`;

    // solo va al archivo y graba una línea al final del mismo
    fs.appendFileSync(this.allLogsPath, logAsJSON);

    if (newLog.getLevel() === LogSeverityLevel.low) return;

    if (newLog.getLevel() === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJSON);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJSON);
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
