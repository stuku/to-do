import AppServer from "@config/AppServer";

const appServer = new AppServer();
appServer.start(process.env["PORT"] || 49170);