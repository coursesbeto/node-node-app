import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// abstracta para evitar crear instancias (aquí en ts es así).
// simplemente definimos el contrato
export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
