// import { Delete, Get, Post, Put, Route } from "tsoa";
import { getObserver } from "@utils/response";
import { Request, Response } from "express";
import { ToDoService } from "@services/to-do.service";

interface IToDoController {
    getAll(_req: Request, res: Response): void;
    addOne(_req: Request, res: Response): Promise<void>;
    updateOne(_req: Request, res: Response): Promise<void>;
    deleteOne(_req: Request, res: Response): Promise<void>;
}

const _toDoService: ToDoService = new ToDoService();

// @Route("/to-do")
export class ToDoController implements IToDoController {
    /** 
     * Get to-do list with filter, sort, pagination 
     * @param query
     */
    // @Get()
    public getAll(_req: Request, res: Response): void {
        _toDoService.getAll(_req?.params).subscribe(getObserver(res));
    }

    /** 
     * Create a to-do item
     * @param request
     */
    // @Post()
    public async addOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.addOne(_req?.body)).subscribe(getObserver(res));
    }

    /** 
     * Update a to-do item
     * @param request
     */
    // @Put("/{id}")
    public async updateOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.updateOne(_req?.params?.id, _req?.body)).subscribe(getObserver(res));
    }

    /** 
     * Delete a to-do item
     * @param request
     */
    // @Delete("/{id}")
    public async deleteOne(_req: Request, res: Response): Promise<void> {
        (await _toDoService.deleteOne(_req?.params?.id)).subscribe(getObserver(res));
    }
}