import { Server } from "./presentation/server";

(async () => {
  await Main();
})();

async function Main() {
  Server.start();
}
