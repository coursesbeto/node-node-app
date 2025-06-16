import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./services/cron-service";

export class Server {
  static start() {
    console.log("server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();

      new CheckService().execute("https://cursos.devtalles.com/");
      // new CheckService().execute("http://localhost:3000/");
    });
  }
}
