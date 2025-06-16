import { CronService } from "./services/cron-service";

export class Server {
  static start() {
    console.log("server started...");

    CronService.createJob(
      "*/5 * * * * *",
      () => {
        const date = new Date();

        console.log(`se ha ejecutado el cron ${date}`)
      }
    );
  }
}
