import path from "path";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
}

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    MONGODB_URL,
} = process.env;

export default {
    API_DOC: "/api-doc",
    MONGODB_URL: MONGODB_URL || `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
}