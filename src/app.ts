import { Server } from "./presentation/server";
process.loadEnvFile();

(async () => {
  await Main();
})();

async function Main() {
  const mailerEmail = process.env.MAILER_EMAIL;
  const mailerSecretKey = process.env.MAILER_SECRET_KEY;
  const prod = process.env.PROD;

  // Validate MAILER_EMAIL
  if (
    typeof mailerEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailerEmail)
  ) {
    throw new Error("MAILER_EMAIL must be a valid email address");
  }

  // Validate MAILER_SECRET_KEY
  if (typeof mailerSecretKey !== "string" || mailerSecretKey.trim() === "") {
    throw new Error("MAILER_SECRET_KEY must be a non-empty string");
  }

  // Validate PROD
  if (
    typeof prod !== "string" ||
    !["true", "false"].includes(prod.toLowerCase())
  ) {
    throw new Error("PROD must be a boolean string ('true' or 'false')");
  }

  Server.start();
}
