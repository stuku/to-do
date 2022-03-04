import AppServer from "@config/app-server";

export const appServer: AppServer = new AppServer();
appServer.start(process.env["PORT"] || 49170);