import express, { Application } from "express";
import { Server } from "http";

// Create Express server
const app: Application = express();

// Express configuration
const PORT: string | number = process.env.PORT || 49170;
app.set("port", PORT);

const server: Server = app.listen(PORT, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        PORT,
        app.get("env")
    );
});

export default server;
