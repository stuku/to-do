import { Document, model, Schema } from "mongoose";
import { EStatus } from "@enums/to-do";

export interface IToDo extends Document {
    name: string
    description?: string
    status: EStatus
}

const toDoSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: EStatus,
            default: EStatus.TO_DO
        },
    },
    { timestamps: true }
)

export default model<IToDo>("ToDo", toDoSchema);