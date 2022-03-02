import { Body, BodyProp, Delete, Get, Post, Put, Route } from "tsoa";
import ToDoModel from "@models/ToDo";

// local copies for tsoa
enum EStatus {
    TO_DO = 0,
    DOING = 1,
    DONE = 2,
    PENDING = 99
}

interface IToDo {
    _id: string;
    name: string;
    description?: string;
    status: EStatus;
}

@Route("/to-do")
export class ToDoController {
    @Get()
    public async getAll(): Promise<IToDo[]> {
        return await ToDoModel.find().limit(10);
    }

    @Post()
    public async addOne(@Body() toDo: IToDo): Promise<void> {
        const item = new ToDoModel(toDo);
        await item.save();
    }


    @Put("/{id}")
    public async updateOne(id: string, @BodyProp() toDo: IToDo): Promise<void> {
        await ToDoModel.findOneAndUpdate({ _id: id }, toDo);
    }

    @Delete("/{id}")
    public async deleteOne(id: string): Promise<void> {
        await ToDoModel.findByIdAndRemove(id);
    }
}