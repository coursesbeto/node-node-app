import { CronJob } from "cron";

export class Server {
  static start() {
    console.log("server started...");

    const job = new CronJob(
      "*/2 * * * * *", // cronTime
      function () {
        const date = new Date();
        console.log(`You will see this message every 2 seconds: ${date}}`);
      }, // onTick
      null, // onComplete
      false, // start
      "America/Los_Angeles" // timeZone
    );

    job.start();
  }
}
