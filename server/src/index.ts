import AppServer from "@config/app-server";
import path from "path";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
}

export const appServer: AppServer = new AppServer();
appServer.start(process.env.NODE_PORT || 8080);