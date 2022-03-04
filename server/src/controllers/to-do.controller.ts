// import { Body, Delete, Get, Post, Put, Route } from "tsoa";
import { generateResponse } from "@utils/response";
import { Request, Response } from "express";
import ToDoModel from "@models/to-do.model";
import { StatusCodes } from "http-status-codes";

// @Route("/to-do")
export class ToDoController {
    // @Get()
    public getAll(_req: Request, res: Response): void {
        ToDoModel.find({}).limit(10).then((toDos) => {
            res.json(generateResponse(StatusCodes.OK, "", toDos))
        });
    }

    // @Post()
    public addOne(_req: Request, res: Response): void {
        ToDoModel.create(_req.body).then((toDo) => {
            res.json(generateResponse(StatusCodes.OK, "", toDo));
        });
    }


    // @Put("/{id}")
    public updateOne(_req: Request, res: Response): void {
        ToDoModel.findOneAndUpdate({ _id: _req?.params?.id }, { $set: _req.body }).then((updatedToDo) => {
            res.json(generateResponse(StatusCodes.OK, "", updatedToDo));
        });
    }

    // @Delete("/{id}")
    public deleteOne(_req: Request, res: Response): void {
        ToDoModel.findOneAndDelete({ _id: _req?.params?.id }).then(() => {
            res.json(generateResponse(StatusCodes.OK, "", null));
        })
    }
}