import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { CronService } from "./services/cron-service";

// creando la implementacion del repository y pasando el datasource que es la propia implementación
// de un logDataSource, la implementación es para guardar en fileSystem.
// gracias a esto facilmente podemos crear otras implementaciones como DB's y pasar la dependencia.
const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  static start() {
    console.log("server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();

      // aqui se esta haciendo la inyeccion de dependencias de la manera mas sencilla
      // const url = "https://cursos.devtalles.com/";
      const url = "http://localhost:3000/";

      new CheckService(
        fileSystemRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
