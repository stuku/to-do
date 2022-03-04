import { Document, model, Schema } from "mongoose";
import { EStatus } from "@enums/to-do.enum";

export interface IToDo extends Document {
    _id: string;
    title: string;
    description?: string;
    status: typeof EStatus;
}

const toDoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        status: {
            type: typeof EStatus,
            default: EStatus.TO_DO
        },
    },
    { timestamps: true }
)

export default model<IToDo>("ToDo", toDoSchema);