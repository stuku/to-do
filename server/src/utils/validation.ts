import { check } from "express-validator";
import { errorHandler } from "@utils/errors";

export const toDoModelValidation = [
    check("title").exists().isLength({ min: 3 }),
    errorHandler,
];