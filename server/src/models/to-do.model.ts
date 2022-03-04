import { Document, Schema, model } from "mongoose";
import { EStatus } from "@enums/to-do.enum";

export interface IToDo extends Document {
    _id: string;
    title: string;
    description?: string;
    status: typeof EStatus[keyof typeof EStatus];
}

const toDoSchema: Schema<IToDo> = new Schema<IToDo>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        status: {
            type: Number,
            enum: Object.keys(EStatus),
            default: EStatus.TO_DO
        },
    },
    { timestamps: true }
);

export default model<IToDo>("ToDo", toDoSchema);