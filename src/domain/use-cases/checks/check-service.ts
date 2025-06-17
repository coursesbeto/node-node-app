import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

// types
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  // la inyeccion de dependencias no es más que enviar dependencias a una clase y esto se puede hacer
  // desde el contructor en ts. en js sería con un factory function
  // readonly porque solo queremos leer el callback, no queremos modificarlo
  constructor(
    private readonly logRepository: LogRepository ,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      // llamada a la dependencia para grabar un log
      this.logRepository.saveLog( new LogEntity({level: LogSeverityLevel.low, message: `Service ${ url } is working`, origin: "check-service.ts"}) );
      // llamada a la dependencia / callback
      this.successCallback();
      return true;
    } catch (error) {
      // llamada a la dependencia para grabar un log
      this.logRepository.saveLog( new LogEntity({level: LogSeverityLevel.high, message: `${ url } is down: ${error}`, origin: "check-service.ts"}) );
      this.errorCallback(String(error));
      return false;
    }
  }
}
