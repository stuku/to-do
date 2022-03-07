import { Document, Schema, model } from "mongoose";
import { EStatus } from "@enums/to-do.enum";

export type Status = typeof EStatus[keyof typeof EStatus];

export interface IToDo extends Document {
    _id: string;
    title: string;
    description?: string;
    status: Status;
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
            enum: [EStatus.TO_DO, EStatus.DOING, EStatus.DONE, EStatus.PENDING],
            default: EStatus.TO_DO
        },
    },
    { timestamps: true }
);

export default model<IToDo>("ToDo", toDoSchema);