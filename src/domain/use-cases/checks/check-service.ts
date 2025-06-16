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
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      // llamada a la dependencia / callback
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(String(error));
      return false;
    }
  }
}
