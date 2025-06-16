import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./services/cron-service";

export class Server {
  static start() {
    console.log("server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();

      // aqui se esta haciendo la inyeccion de dependencias de la manera mas sencilla
      const url = "https://cursos.devtalles.com/";

      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
