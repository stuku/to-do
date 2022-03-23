import AppServer from "@config/app-server";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

export const appServer: AppServer = new AppServer();
appServer.start(process.env.NODE_PORT || 8080);